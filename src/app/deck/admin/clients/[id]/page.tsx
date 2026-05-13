import {redirect, notFound} from 'next/navigation';
import Link from 'next/link';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {ClientLinks} from './client-links';
import {ClientEdit} from './client-edit';
import {SessionsList} from './sessions-list';
import {LogoutButton} from '../../logout-button';

export const dynamic = 'force-dynamic';

type Params = {id: string};

export default async function ClientDetailPage({params}: {params: Promise<Params>}) {
  const session = await getCurrentSession();
  if (!session) redirect('/deck/admin/login');

  const {id} = await params;
  const sb = supabaseAdmin();

  const {data: client} = await sb.from('clients').select('*').eq('id', id).maybeSingle();
  if (!client) notFound();

  const {data: links} = await sb
    .from('presentation_links')
    .select('*')
    .eq('client_id', id)
    .order('created_at', {ascending: false});

  const linkIds = (links ?? []).map((l) => l.id);
  const {data: sessions} = linkIds.length
    ? await sb
        .from('deck_sessions')
        .select('*')
        .in('link_id', linkIds)
        .order('started_at', {ascending: false})
        .limit(50)
    : {data: []};

  // Pull events for the same set of sessions — used inside SessionsList to
  // build the per-visitor slide breakdown when a row is expanded.
  const sessionIds = (sessions ?? []).map((s) => s.id);
  const {data: events} = sessionIds.length
    ? await sb.from('slide_events').select('*').in('session_id', sessionIds)
    : {data: []};

  const totalSessions = sessions?.length ?? 0;
  const uniqueVisitors = new Set((sessions ?? []).map((s) => s.visitor_id).filter(Boolean)).size;
  const totalTimeMs = (sessions ?? []).reduce((acc, s) => acc + (s.total_duration_ms ?? 0), 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/deck/admin" className="text-sm text-zinc-400 hover:text-zinc-200">
          ← All clients
        </Link>
        <LogoutButton />
      </div>

      <header className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {client.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={client.logo_url}
              alt={client.name}
              className="w-10 h-10 rounded-md object-contain bg-zinc-900 border border-zinc-800 p-1"
            />
          ) : (
            <span
              className="w-4 h-4 rounded-full"
              style={{background: client.brand_color ?? '#3f3f46'}}
              aria-hidden
            />
          )}
          <div>
            <h1 className="text-2xl font-semibold">{client.name}</h1>
            <p className="text-xs text-zinc-500 mt-1 font-mono">/{client.slug}</p>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-10">
        <Stat label="Sessions" value={totalSessions} />
        <Stat label="Unique visitors" value={uniqueVisitors} />
        <Stat label="Total time" value={formatDuration(totalTimeMs)} />
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-wide text-zinc-400">Visitors</h2>
          <span className="text-xs text-zinc-500">
            Grouped by browser · most recent first
          </span>
        </div>
        <SessionsList
          sessions={(sessions ?? []).map((s) => ({
            id: s.id,
            link_id: s.link_id,
            visitor_name: s.visitor_name,
            visitor_id: s.visitor_id,
            ip_city: s.ip_city,
            ip_country: s.ip_country,
            started_at: s.started_at,
            total_duration_ms: s.total_duration_ms,
            max_slide_index: s.max_slide_index
          }))}
          events={(events ?? []).map((e) => ({
            session_id: e.session_id,
            slide_id: e.slide_id,
            slide_index: e.slide_index,
            duration_ms: e.duration_ms,
            entered_at: e.entered_at
          }))}
          recipientByLinkId={Object.fromEntries(
            (links ?? []).map((l) => [l.id, l.recipient_name ?? null])
          )}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">Share links</h2>
        <ClientLinks clientId={client.id} clientSlug={client.slug} initialLinks={links ?? []} />
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">Pricing</h2>
        <div className="grid grid-cols-3 gap-4">
          <Stat
            label="Kick off"
            value={formatMoney(client.pricing_kickoff, client.currency)}
          />
          <Stat
            label="Monthly fixed"
            value={formatMoney(client.pricing_monthly_fixed, client.currency)}
          />
          <Stat
            label="Per active user"
            value={formatMoney(client.pricing_per_active_user, client.currency)}
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">Client details</h2>
        <ClientEdit client={client} />
      </section>
    </div>
  );
}

function Stat({label, value}: {label: string; value: string | number}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
      <div className="text-xs uppercase tracking-wide text-zinc-400">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function formatDuration(ms: number): string {
  if (!ms || ms < 1000) return '0s';
  const sec = Math.floor(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  if (min < 60) return `${min}m ${remSec}s`;
  const hr = Math.floor(min / 60);
  const remMin = min % 60;
  return `${hr}h ${remMin}m`;
}

function formatMoney(value: number | null, currency: string): string {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-US', {style: 'currency', currency}).format(value);
}
