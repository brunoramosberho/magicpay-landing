import {NextRequest, NextResponse} from 'next/server';
import {supabaseAdmin} from '@/lib/supabase/server';

export const runtime = 'nodejs';

type TrackBody = {
  type: 'session_start' | 'session_heartbeat' | 'slide_enter' | 'slide_exit' | 'interaction';
  token: string;
  visitorId?: string;
  visitorName?: string;
  sessionId?: string;
  slideId?: string;
  slideIndex?: number;
  durationMs?: number;
  interaction?: {type: string; data?: unknown};
  userAgent?: string;
  referrer?: string;
};

export async function POST(req: NextRequest) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
  }

  if (!body.token) return NextResponse.json({error: 'Missing token'}, {status: 400});

  const sb = supabaseAdmin();

  const {data: link} = await sb
    .from('presentation_links')
    .select('id, revoked_at, expires_at')
    .eq('token', body.token)
    .maybeSingle();

  if (!link) return NextResponse.json({error: 'Unknown token'}, {status: 404});
  if (link.revoked_at) return NextResponse.json({error: 'Revoked'}, {status: 410});
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return NextResponse.json({error: 'Expired'}, {status: 410});
  }

  switch (body.type) {
    case 'session_start': {
      const geo = readGeo(req);
      const visitorName = sanitizeName(body.visitorName);
      const {data: session, error} = await sb
        .from('deck_sessions')
        .insert({
          link_id: link.id,
          visitor_id: body.visitorId ?? null,
          visitor_name: visitorName,
          user_agent: body.userAgent ?? req.headers.get('user-agent') ?? null,
          referrer: body.referrer ?? null,
          ip_country: geo.country,
          ip_region: geo.region,
          ip_city: geo.city
        })
        .select('id')
        .single();
      if (error) return NextResponse.json({error: error.message}, {status: 500});
      return NextResponse.json({sessionId: session.id});
    }

    case 'session_heartbeat': {
      if (!body.sessionId) return NextResponse.json({error: 'Missing sessionId'}, {status: 400});
      const {error} = await sb
        .from('deck_sessions')
        .update({
          last_seen_at: new Date().toISOString(),
          total_duration_ms: body.durationMs ?? 0,
          max_slide_index: body.slideIndex ?? 0
        })
        .eq('id', body.sessionId);
      if (error) return NextResponse.json({error: error.message}, {status: 500});
      return NextResponse.json({ok: true});
    }

    case 'slide_enter': {
      if (!body.sessionId || !body.slideId) {
        return NextResponse.json({error: 'Missing sessionId/slideId'}, {status: 400});
      }
      const {data: ev, error} = await sb
        .from('slide_events')
        .insert({
          session_id: body.sessionId,
          slide_id: body.slideId,
          slide_index: body.slideIndex ?? null
        })
        .select('id')
        .single();
      if (error) return NextResponse.json({error: error.message}, {status: 500});
      return NextResponse.json({eventId: ev.id});
    }

    case 'slide_exit': {
      if (!body.sessionId || !body.slideId) {
        return NextResponse.json({error: 'Missing fields'}, {status: 400});
      }
      const {data: latest} = await sb
        .from('slide_events')
        .select('id, entered_at')
        .eq('session_id', body.sessionId)
        .eq('slide_id', body.slideId)
        .is('exited_at', null)
        .order('entered_at', {ascending: false})
        .limit(1)
        .maybeSingle();
      if (!latest) return NextResponse.json({ok: true});
      const exitedAt = new Date();
      const enteredAt = new Date(latest.entered_at);
      const duration = body.durationMs ?? exitedAt.getTime() - enteredAt.getTime();
      const {error} = await sb
        .from('slide_events')
        .update({exited_at: exitedAt.toISOString(), duration_ms: duration})
        .eq('id', latest.id);
      if (error) return NextResponse.json({error: error.message}, {status: 500});
      return NextResponse.json({ok: true});
    }

    case 'interaction': {
      if (!body.sessionId || !body.slideId || !body.interaction) {
        return NextResponse.json({error: 'Missing fields'}, {status: 400});
      }
      const {data: latest} = await sb
        .from('slide_events')
        .select('id, interactions')
        .eq('session_id', body.sessionId)
        .eq('slide_id', body.slideId)
        .order('entered_at', {ascending: false})
        .limit(1)
        .maybeSingle();
      if (!latest) return NextResponse.json({ok: true});
      const next = [
        ...((latest.interactions as unknown[]) ?? []),
        {...body.interaction, at: new Date().toISOString()}
      ];
      const {error} = await sb
        .from('slide_events')
        .update({interactions: next})
        .eq('id', latest.id);
      if (error) return NextResponse.json({error: error.message}, {status: 500});
      return NextResponse.json({ok: true});
    }
  }

  return NextResponse.json({error: 'Unknown event type'}, {status: 400});
}

function readGeo(req: NextRequest) {
  return {
    country: req.headers.get('x-vercel-ip-country') ?? null,
    region: req.headers.get('x-vercel-ip-country-region') ?? null,
    city: decodeOrNull(req.headers.get('x-vercel-ip-city'))
  };
}

function decodeOrNull(v: string | null): string | null {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function sanitizeName(raw: string | undefined): string | null {
  if (typeof raw !== 'string') return null;
  const trimmed = raw.trim().replace(/\s+/g, ' ');
  if (!trimmed) return null;
  return trimmed.slice(0, 80);
}
