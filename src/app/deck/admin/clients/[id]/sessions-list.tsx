'use client';

import {useMemo, useState} from 'react';
import {deckSlides} from '@/components/deck/slides';

const SLIDE_LABELS: Record<string, string> = {
  cover: '01 Cover',
  background: '02 Background',
  infrastructure: '03 Infraestructura',
  whatsapp: '04 WhatsApp',
  problem: '05 Problema',
  flow: '06 Flow',
  'what-is-magic': '07 Solución',
  'keyboard-demo': '08 Teclado',
  'thirty-x': '09 30x',
  'claim-demo': '10 Claim',
  'tap-demo': '11 Tap',
  'voice-demo': '12 Voz',
  whitelabel: '13 White-label',
  security: '14 Seguridad',
  benefits: '15 Beneficios',
  implementation: '16 Implementación',
  regulatory: '17 Regulatorio',
  pricing: '18 Pricing',
  closing: '19 Cierre'
};

const SLIDE_ORDER: Record<string, number> = Object.fromEntries(
  deckSlides.map((s, i) => [s.id, i])
);
// `deckSlides` reflects the *route-filtered* order (no Bruno bio by default),
// so a slide_id that's missing here falls back to a high index — keeps it at
// the bottom of the per-visitor breakdown rather than crashing.
const SLIDE_COUNT = deckSlides.length;

export type SessionRow = {
  id: string;
  link_id: string;
  visitor_name: string | null;
  visitor_id: string | null;
  ip_city: string | null;
  ip_country: string | null;
  started_at: string;
  total_duration_ms: number | null;
  max_slide_index: number | null;
};

export type EventRow = {
  session_id: string;
  slide_id: string;
  slide_index: number | null;
  duration_ms: number | null;
  entered_at: string;
};

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

function formatLocation(city: string | null, country: string | null): string | null {
  if (!city) return country ?? null;
  return country ? `${city}, ${country}` : city;
}

function formatRelative(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

type VisitorRow = {
  /** Stable grouping key — visitor_id when present, otherwise a name fallback */
  key: string;
  /** Display name — most recent visitor_name that's not blank */
  name: string;
  /** Whether the displayed name came from a visitor_name (vs the link recipient) */
  nameSource: 'visitor' | 'link' | 'unknown';
  /** Link-level recipient name when available and different from display name */
  linkRecipient: string | null;
  location: string | null;
  sessionCount: number;
  totalMs: number;
  /** Furthest slide index reached across all sessions (0-based) */
  maxSlideIndex: number;
  lastSeenAt: string;
  firstSeenAt: string;
  /** Ordered session ids — newest first, used to pull events for the breakdown */
  sessionIds: string[];
};

function groupByVisitor(
  sessions: SessionRow[],
  recipientByLinkId: Record<string, string | null>
): VisitorRow[] {
  const map = new Map<string, VisitorRow>();
  for (const s of sessions) {
    const linkRecipient = recipientByLinkId[s.link_id] ?? null;
    const visitorName = s.visitor_name?.trim() || null;
    // Prefer visitor_id; if absent, fall back to a name-derived key so people
    // who skipped the name gate at least show up as separate rows.
    const key = s.visitor_id
      ? `v:${s.visitor_id}`
      : `n:${visitorName ?? 'unknown'}:${s.link_id}`;
    const location = formatLocation(s.ip_city, s.ip_country);
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
        // Take name/location from most recent session — that's the freshest signal.
        if (visitorName) {
          existing.name = visitorName;
          existing.nameSource = 'visitor';
        }
        if (location) existing.location = location;
        if (linkRecipient) existing.linkRecipient = linkRecipient;
      }
      if (s.started_at < existing.firstSeenAt) existing.firstSeenAt = s.started_at;
    } else {
      const name = visitorName ?? linkRecipient ?? 'Unknown visitor';
      const nameSource: 'visitor' | 'link' | 'unknown' = visitorName
        ? 'visitor'
        : linkRecipient
        ? 'link'
        : 'unknown';
      map.set(key, {
        key,
        name,
        nameSource,
        linkRecipient,
        location,
        sessionCount: 1,
        totalMs: s.total_duration_ms ?? 0,
        maxSlideIndex: s.max_slide_index ?? 0,
        lastSeenAt: s.started_at,
        firstSeenAt: s.started_at,
        sessionIds: [s.id]
      });
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    b.lastSeenAt.localeCompare(a.lastSeenAt)
  );
}

export function SessionsList({
  sessions,
  events,
  recipientByLinkId
}: {
  sessions: SessionRow[];
  events: EventRow[];
  recipientByLinkId: Record<string, string | null>;
}) {
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const visitors = useMemo(
    () => groupByVisitor(sessions, recipientByLinkId),
    [sessions, recipientByLinkId]
  );

  const eventsBySession = useMemo(() => {
    const map = new Map<string, EventRow[]>();
    for (const ev of events) {
      const list = map.get(ev.session_id) ?? [];
      list.push(ev);
      map.set(ev.session_id, list);
    }
    return map;
  }, [events]);

  if (visitors.length === 0) {
    return <p className="text-sm text-zinc-500">Nobody has opened this deck yet.</p>;
  }

  return (
    <ul className="border border-zinc-900 rounded-md divide-y divide-zinc-900">
      {visitors.map((v) => {
        const isOpen = expandedKey === v.key;
        const events = v.sessionIds.flatMap(
          (sid) => eventsBySession.get(sid) ?? []
        );
        const reachedSlideNumber = v.maxSlideIndex + 1;
        const slideTotal = SLIDE_COUNT;
        const depthPct = Math.min(100, (reachedSlideNumber / slideTotal) * 100);
        const showsLinkRecipient =
          v.nameSource === 'visitor' &&
          v.linkRecipient &&
          v.linkRecipient.trim().toLowerCase() !== v.name.trim().toLowerCase();
        return (
          <li key={v.key}>
            <button
              type="button"
              onClick={() => setExpandedKey(isOpen ? null : v.key)}
              className="w-full px-4 py-3 text-sm text-left hover:bg-zinc-950 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-zinc-200">
                    <span
                      className={`inline-block transition-transform text-zinc-600 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    >
                      ▸
                    </span>
                    <span className="font-medium truncate">{v.name}</span>
                    {v.sessionCount > 1 && (
                      <span className="text-[10px] uppercase tracking-wide bg-zinc-800/70 text-zinc-400 rounded px-1.5 py-0.5">
                        Returning · {v.sessionCount}×
                      </span>
                    )}
                    {v.nameSource === 'unknown' && (
                      <span className="text-[10px] uppercase tracking-wide bg-zinc-800/40 text-zinc-500 rounded px-1.5 py-0.5">
                        Anonymous
                      </span>
                    )}
                  </div>
                  <div className="ml-6 mt-1 text-xs text-zinc-500 flex flex-wrap gap-x-2 gap-y-0.5">
                    {v.location && <span>{v.location}</span>}
                    {showsLinkRecipient && (
                      <span>· shared with {v.linkRecipient}</span>
                    )}
                    <span>· last seen {formatRelative(v.lastSeenAt)}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-zinc-200 tabular-nums">
                    {formatDuration(v.totalMs)}
                  </div>
                  <div className="text-[11px] text-zinc-500 tabular-nums mt-0.5">
                    slide {reachedSlideNumber} / {slideTotal}
                  </div>
                  <div className="w-20 h-1 bg-zinc-900 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500/70"
                      style={{width: `${depthPct}%`}}
                    />
                  </div>
                </div>
              </div>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-2 ml-6 border-t border-zinc-900/60 bg-zinc-950/40">
                <VisitorBreakdown events={events} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function VisitorBreakdown({events}: {events: EventRow[]}) {
  const rows = useMemo(() => {
    const byId = new Map<string, {totalMs: number; visits: number}>();
    for (const ev of events) {
      const cur = byId.get(ev.slide_id) ?? {totalMs: 0, visits: 0};
      cur.totalMs += ev.duration_ms ?? 0;
      cur.visits += 1;
      byId.set(ev.slide_id, cur);
    }
    return Array.from(byId.entries())
      .map(([slideId, stat]) => ({
        slideId,
        label: SLIDE_LABELS[slideId] ?? slideId,
        order: SLIDE_ORDER[slideId] ?? 999,
        totalMs: stat.totalMs,
        visits: stat.visits
      }))
      .sort((a, b) => a.order - b.order);
  }, [events]);

  const max = useMemo(() => {
    const values = rows.map((r) => r.totalMs);
    return Math.max(...values, 1);
  }, [rows]);

  if (rows.length === 0) {
    return (
      <p className="text-xs text-zinc-500 py-2">
        Sin eventos registrados todavía para este visitor.
      </p>
    );
  }

  return (
    <div className="pt-3">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-2">
        Tiempo por slide · acumulado de todas sus sesiones
      </p>
      <ul className="space-y-1.5">
        {rows.map((r) => {
          const pct = (r.totalMs / max) * 100;
          return (
            <li key={r.slideId} className="text-xs">
              <div className="flex items-baseline justify-between gap-3 mb-0.5">
                <span className="text-zinc-300 truncate">{r.label}</span>
                <span className="text-zinc-500 tabular-nums shrink-0">
                  {formatDuration(r.totalMs)}
                  {r.visits > 1 && (
                    <span className="text-zinc-600"> · {r.visits} visits</span>
                  )}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/70"
                  style={{width: `${pct}%`}}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
