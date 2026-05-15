import {NextRequest, NextResponse} from 'next/server';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {generateToken, slugify} from '@/lib/deck/tokens';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  const sb = supabaseAdmin();
  const {data, error} = await sb
    .from('clients')
    .select('*')
    .is('archived_at', null)
    .order('created_at', {ascending: false});

  if (error) return NextResponse.json({error: error.message}, {status: 500});
  return NextResponse.json({clients: data ?? []});
}

export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  let body: {
    name?: string;
    slug?: string;
    brand_color?: string;
    logo_url?: string;
    app_icon_url?: string;
    pricing_kickoff?: number | null;
    pricing_monthly_fixed?: number | null;
    pricing_per_active_user?: number | null;
    currency?: string;
    notes?: string;
    create_initial_link?: boolean;
    recipient_name?: string;
    recipient_email?: string;
    initial_link_variant?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
  }

  const name = (body.name ?? '').trim();
  if (!name) return NextResponse.json({error: 'Name is required'}, {status: 400});

  const slug = slugify(body.slug?.trim() || name);
  if (!slug) return NextResponse.json({error: 'Could not derive slug'}, {status: 400});

  const sb = supabaseAdmin();

  const {data: client, error: clientErr} = await sb
    .from('clients')
    .insert({
      name,
      slug,
      brand_color: body.brand_color ?? null,
      logo_url: body.logo_url ?? null,
      app_icon_url: body.app_icon_url ?? null,
      pricing_kickoff: body.pricing_kickoff ?? null,
      pricing_monthly_fixed: body.pricing_monthly_fixed ?? null,
      pricing_per_active_user: body.pricing_per_active_user ?? null,
      currency: body.currency ?? 'MXN',
      notes: body.notes ?? null,
      created_by: session.email
    })
    .select('*')
    .single();

  if (clientErr) return NextResponse.json({error: clientErr.message}, {status: 500});

  let link: {token: string; id: string} | null = null;
  if (body.create_initial_link !== false) {
    const token = generateToken();
    const variant = body.initial_link_variant === 'short' ? 'short' : 'full';
    const {data: linkRow, error: linkErr} = await sb
      .from('presentation_links')
      .insert({
        client_id: client.id,
        token,
        variant,
        recipient_name: body.recipient_name ?? null,
        recipient_email: body.recipient_email ?? null,
        created_by: session.email
      })
      .select('id, token')
      .single();
    if (linkErr) return NextResponse.json({error: linkErr.message}, {status: 500});
    link = linkRow;
  }

  return NextResponse.json({client, link});
}
