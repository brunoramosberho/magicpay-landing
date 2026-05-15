import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {NewClientForm} from './new-client-form';
import {LogoutButton} from './logout-button';
import {RecentActivity, type ActivityRow} from './recent-activity';
import type {PresentationLinkVariant} from '@/lib/deck/types';

export const dynamic = 'force-dynamic';

// Cap on the number of grouped activity rows surfaced above-the-fold. The
// raw query pulls a wider window so grouping has enough data to dedupe; we
// only render the freshest few so the dashboard stays scannable.
const ACTIVITY_LIMIT = 8;

type RawSession = {
  id: string;
  visitor_id: string | null;
  visitor_name: string | null;
  ip_city: string | null;
  ip_country: string | null;
  started_at: string;
  total_duration_ms: number | null;
  max_slide_index: number | null;
  link_id: string;
  link:
    | {
        variant: string | null;
        client:
          | {
              id: string;
              name: string;
              slug: string;
              brand_color: string | null;
              archived_at: string | null;
            }
          | {
              id: string;
              name: string;
              slug: string;
              brand_color: string | null;
              archived_at: string | null;
            }[]
          | null;
      }
    | {
        variant: string | null;
        client:
          | {
              id: string;
              name: string;
              slug: string;
              brand_color: string | null;
              archived_at: string | null;
            }
          | {
              id: string;
              name: string;
              slug: string;
              brand_color: string | null;
              archived_at: string | null;
            }[]
          | null;
      }[]
    | null;
};

function unwrap<T>(value: T | T[] | null): T | null {
  if (!value) return null;
  return Array.isArray(value) ? value[0] ?? null : value;
}

function groupActivity(sessions: RawSession[]): ActivityRow[] {
  const map = new Map<string, ActivityRow>();
  for (const s of sessions) {
    const link = unwrap(s.link);
    const client = unwrap(link?.client ?? null);
    if (!client || client.archived_at) continue;
    const variant: PresentationLinkVariant =
      link?.variant === 'short' ? 'short' : 'full';
    const visitorName = s.visitor_name?.trim() || null;
    // Group by visitor + client + variant. Different decks viewed by the
    // same browser stay separate ("Bruno opened Stori AND CNBV" matters);
    // and Short vs Full of the same client also split so each row gets the
    // right slide-count denominator and ordering.
    const key = `${s.visitor_id ?? `n:${visitorName ?? 'anon'}:${s.link_id}`}::${client.id}::${variant}`;
    const location = s.ip_city
      ? s.ip_country
        ? `${s.ip_city}, ${s.ip_country}`
        : s.ip_city
      : null;
    const existing = map.get(key);
    if (existing) {
      existing.sessionCount += 1;
      existing.totalMs += s.total_duration_ms ?? 0;
      existing.maxSlideIndex = Math.max(
        existing.maxSlideIndex,
        s.max_slide_index ?? 0
      );
      existing.sessionIds.push(s.id);
      if (s.started_at > existing.lastSeenAt) {
        existing.lastSeenAt = s.started_at;
        if (visitorName) {
          existing.visitorName = visitorName;
          existing.isAnonymous = false;
        }
        if (location) existing.location = location;
      }
    } else {
      map.set(key, {
        key,
        visitorName: visitorName ?? 'Anonymous',
        isAnonymous: !visitorName,
        clientId: client.id,
        clientName: client.name,
        clientSlug: client.slug,
        brandColor: client.brand_color,
        variant,
        location,
        sessionCount: 1,
        totalMs: s.total_duration_ms ?? 0,
        maxSlideIndex: s.max_slide_index ?? 0,
        lastSeenAt: s.started_at,
        sessionIds: [s.id]
      });
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    b.lastSeenAt.localeCompare(a.lastSeenAt)
  );
}

export default async function AdminHome() {
  const session = await getCurrentSession();
  if (!session) redirect('/deck/admin/login');

  const sb = supabaseAdmin();

  const {data: clients} = await sb
    .from('clients')
    .select(
      'id, slug, name, brand_color, created_at, presentation_links(count), deck_sessions:presentation_links(deck_sessions(count))'
    )
    .is('archived_at', null)
    .order('created_at', {ascending: false});

  // Pull a wider window of recent sessions across every deck and let the
  // visitor+client+variant grouping deduplicate noisy repeat opens before we
  // cap the visible list. Limit kept generous so the grouped list isn't
  // half-empty when one visitor refreshes ten times.
  const {data: rawSessions} = await sb
    .from('deck_sessions')
    .select(
      `id, visitor_id, visitor_name, ip_city, ip_country, started_at, total_duration_ms, max_slide_index, link_id,
       link:presentation_links!inner(
         variant,
         client:clients!inner(id, name, slug, brand_color, archived_at)
       )`
    )
    .order('started_at', {ascending: false})
    .limit(120);

  const activity = groupActivity((rawSessions ?? []) as RawSession[]).slice(
    0,
    ACTIVITY_LIMIT
  );

  // Pull slide_events for just the sessions belonging to the visible rows so
  // the inline "expand → per-slide breakdown" UI doesn't need a follow-up
  // round trip when the user clicks a row.
  const visibleSessionIds = activity.flatMap((a) => a.sessionIds);
  const {data: events} = visibleSessionIds.length
    ? await sb
        .from('slide_events')
        .select('session_id, slide_id, slide_index, duration_ms, entered_at')
        .in('session_id', visibleSessionIds)
    : {data: []};

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Deck Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Signed in as {session.email}</p>
        </div>
        <LogoutButton />
      </header>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm uppercase tracking-wide text-zinc-400">
            Recent activity
          </h2>
          <span className="text-xs text-zinc-500">
            Top {ACTIVITY_LIMIT} · click a row to see the slide breakdown
          </span>
        </div>
        <RecentActivity rows={activity} events={events ?? []} />
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">
          Clients ({clients?.length ?? 0})
        </h2>
        {!clients || clients.length === 0 ? (
          <p className="text-sm text-zinc-500">No clients yet. Create one below.</p>
        ) : (
          <ul className="divide-y divide-zinc-900 border border-zinc-900 rounded-md">
            {clients.map((c) => {
              const linksCount = Array.isArray(c.presentation_links)
                ? (c.presentation_links[0] as {count: number} | undefined)?.count ?? 0
                : 0;
              return (
                <li key={c.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{background: c.brand_color ?? '#3f3f46'}}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{c.name}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        /{c.slug} · {linksCount} link{linksCount === 1 ? '' : 's'}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/deck/admin/clients/${c.id}`}
                    className="text-sm text-zinc-300 hover:text-zinc-50"
                  >
                    Manage →
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">New client</h2>
        <NewClientForm />
      </section>
    </div>
  );
}
