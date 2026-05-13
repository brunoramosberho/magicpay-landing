import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {NewClientForm} from './new-client-form';
import {LogoutButton} from './logout-button';

export const dynamic = 'force-dynamic';

// Default visible-slide count after the route filters out the Bruno bio slide.
// Used purely as a denominator for the "slide X / Y" depth indicator on the
// activity feed. If you add/remove slides, bump this — wrong by one is fine.
const VISIBLE_SLIDE_COUNT = 18;

type ActivityRow = {
  key: string;
  visitorName: string;
  isAnonymous: boolean;
  clientId: string;
  clientName: string;
  clientSlug: string;
  brandColor: string | null;
  location: string | null;
  sessionCount: number;
  totalMs: number;
  maxSlideIndex: number;
  lastSeenAt: string;
};

type RawSession = {
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
    const visitorName = s.visitor_name?.trim() || null;
    // Different decks viewed by the same browser stay as separate rows — the
    // signal "Bruno opened Stori AND CNBV" is more useful than "Bruno opened
    // 2 decks".
    const key = `${s.visitor_id ?? `n:${visitorName ?? 'anon'}:${s.link_id}`}::${client.id}`;
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
        location,
        sessionCount: 1,
        totalMs: s.total_duration_ms ?? 0,
        maxSlideIndex: s.max_slide_index ?? 0,
        lastSeenAt: s.started_at
      });
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    b.lastSeenAt.localeCompare(a.lastSeenAt)
  );
}

function formatDuration(ms: number): string {
  if (!ms || ms < 1000) return `${Math.max(0, Math.round(ms))}ms`;
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  if (min < 60) return `${min}m ${remSec}s`;
  const hr = Math.floor(min / 60);
  const remMin = min % 60;
  return `${hr}h ${remMin}m`;
}

function formatRelative(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString();
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
  // visitor+client grouping deduplicate noisy repeat opens before we cap the
  // visible list. Limit kept generous so the grouped list isn't half-empty
  // when one visitor refreshes ten times.
  const {data: rawSessions} = await sb
    .from('deck_sessions')
    .select(
      `visitor_id, visitor_name, ip_city, ip_country, started_at, total_duration_ms, max_slide_index, link_id,
       link:presentation_links!inner(
         client:clients!inner(id, name, slug, brand_color, archived_at)
       )`
    )
    .order('started_at', {ascending: false})
    .limit(120);

  const activity = groupActivity((rawSessions ?? []) as RawSession[]).slice(0, 20);

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
            Across all clients · most recent first
          </span>
        </div>
        {activity.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No deck activity yet. Share a link and check back.
          </p>
        ) : (
          <ul className="border border-zinc-900 rounded-md divide-y divide-zinc-900">
            {activity.map((a) => {
              const reachedSlideNumber = a.maxSlideIndex + 1;
              const depthPct = Math.min(
                100,
                (reachedSlideNumber / VISIBLE_SLIDE_COUNT) * 100
              );
              return (
                <li key={a.key}>
                  <Link
                    href={`/deck/admin/clients/${a.clientId}`}
                    className="block px-4 py-3 text-sm hover:bg-zinc-950 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-zinc-200">
                          <span className="font-medium truncate">
                            {a.visitorName}
                          </span>
                          {a.sessionCount > 1 && (
                            <span className="text-[10px] uppercase tracking-wide bg-zinc-800/70 text-zinc-400 rounded px-1.5 py-0.5">
                              Returning · {a.sessionCount}×
                            </span>
                          )}
                          {a.isAnonymous && (
                            <span className="text-[10px] uppercase tracking-wide bg-zinc-800/40 text-zinc-500 rounded px-1.5 py-0.5">
                              Anonymous
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-zinc-500">
                          <span className="inline-flex items-center gap-1.5 text-zinc-400">
                            <span
                              className="inline-block w-2 h-2 rounded-full shrink-0"
                              style={{background: a.brandColor ?? '#3f3f46'}}
                              aria-hidden
                            />
                            {a.clientName}
                          </span>
                          {a.location && <span>· {a.location}</span>}
                          <span>· {formatRelative(a.lastSeenAt)}</span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-zinc-200 tabular-nums">
                          {formatDuration(a.totalMs)}
                        </div>
                        <div className="text-[11px] text-zinc-500 tabular-nums mt-0.5">
                          slide {reachedSlideNumber} / {VISIBLE_SLIDE_COUNT}
                        </div>
                        <div className="w-20 h-1 bg-zinc-900 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500/70"
                            style={{width: `${depthPct}%`}}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
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
