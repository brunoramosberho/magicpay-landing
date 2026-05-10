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

export type SessionRow = {
  id: string;
  link_id: string;
  visitor_name: string | null;
  visitor_id: string | null;
  ip_city: string | null;
  ip_country: string | null;
  started_at: string;
  total_duration_ms: number | null;
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

export function SessionsList({
  sessions,
  events,
  recipientByLinkId
}: {
  sessions: SessionRow[];
  events: EventRow[];
  recipientByLinkId: Record<string, string | null>;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const eventsBySession = useMemo(() => {
    const map = new Map<string, EventRow[]>();
    for (const ev of events) {
      const list = map.get(ev.session_id) ?? [];
      list.push(ev);
      map.set(ev.session_id, list);
    }
    return map;
  }, [events]);

  if (sessions.length === 0) {
    return <p className="text-sm text-zinc-500">No sessions yet.</p>;
  }

  return (
    <ul className="border border-zinc-900 rounded-md divide-y divide-zinc-900">
      {sessions.map((s) => {
        const linkRecipient = recipientByLinkId[s.link_id] ?? null;
        const visitorName = s.visitor_name?.trim() || null;
        const primary = visitorName ?? linkRecipient ?? 'Unknown visitor';
        const secondaryParts: string[] = [];
        if (visitorName && linkRecipient && visitorName !== linkRecipient) {
          secondaryParts.push(`shared with ${linkRecipient}`);
        }
        if (s.ip_city) {
          secondaryParts.push(
            `${s.ip_city}${s.ip_country ? `, ${s.ip_country}` : ''}`
          );
        }
        const isOpen = expandedId === s.id;
        const sessionEvents = eventsBySession.get(s.id) ?? [];
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => setExpandedId(isOpen ? null : s.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm text-left hover:bg-zinc-950 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="min-w-0">
                <div className="text-zinc-300 flex items-center gap-2">
                  <span
                    className={`inline-block transition-transform ${
                      isOpen ? 'rotate-90' : ''
                    } text-zinc-600`}
                  >
                    ▸
                  </span>
                  <span>{primary}</span>
                  {secondaryParts.length > 0 && (
                    <span className="text-zinc-500 truncate">
                      {' '}
                      · {secondaryParts.join(' · ')}
                    </span>
                  )}
                </div>
                <div className="text-xs text-zinc-500 mt-1 ml-6">
                  {new Date(s.started_at).toLocaleString()}
                </div>
              </div>
              <span className="text-zinc-500 shrink-0">
                {formatDuration(s.total_duration_ms ?? 0)}
              </span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 pt-1 ml-6 border-t border-zinc-900/60 bg-zinc-950/40">
                <SessionBreakdown events={sessionEvents} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function SessionBreakdown({events}: {events: EventRow[]}) {
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
        Sin eventos registrados para esta sesión.
      </p>
    );
  }

  return (
    <div className="pt-3">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500 mb-2">
        Tiempo por slide en esta sesión
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
                    <span className="text-zinc-600"> · {r.visits}×</span>
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
