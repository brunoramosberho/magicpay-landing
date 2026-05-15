'use client';

import {useMemo, useState} from 'react';
import Link from 'next/link';
import {VariantTag, VisitorBreakdown, type EventRow} from './clients/[id]/sessions-list';
import {getSlideTotal} from '@/lib/deck/slide-labels';
import type {PresentationLinkVariant} from '@/lib/deck/types';

export type ActivityRow = {
  key: string;
  visitorName: string;
  isAnonymous: boolean;
  clientId: string;
  clientName: string;
  clientSlug: string;
  brandColor: string | null;
  variant: PresentationLinkVariant;
  location: string | null;
  sessionCount: number;
  totalMs: number;
  maxSlideIndex: number;
  lastSeenAt: string;
  sessionIds: string[];
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

export function RecentActivity({
  rows,
  events
}: {
  rows: ActivityRow[];
  events: EventRow[];
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const eventsBySession = useMemo(() => {
    const map = new Map<string, EventRow[]>();
    for (const ev of events) {
      const list = map.get(ev.session_id) ?? [];
      list.push(ev);
      map.set(ev.session_id, list);
    }
    return map;
  }, [events]);

  if (rows.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No deck activity yet. Share a link and check back.
      </p>
    );
  }

  return (
    <ul className="border border-zinc-900 rounded-md divide-y divide-zinc-900">
      {rows.map((a) => {
        const isOpen = openKey === a.key;
        const slideTotal = getSlideTotal(a.variant);
        const reachedSlideNumber = Math.min(a.maxSlideIndex + 1, slideTotal);
        const depthPct = Math.min(100, (reachedSlideNumber / slideTotal) * 100);
        const visitorEvents = a.sessionIds.flatMap(
          (sid) => eventsBySession.get(sid) ?? []
        );
        return (
          <li key={a.key}>
            <div className="flex items-stretch">
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : a.key)}
                aria-expanded={isOpen}
                className="flex-1 min-w-0 px-4 py-3 text-sm text-left hover:bg-zinc-950 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-zinc-200 flex-wrap">
                      <span
                        className={`inline-block transition-transform text-zinc-600 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        ▸
                      </span>
                      <span className="font-medium truncate">{a.visitorName}</span>
                      <VariantTag variant={a.variant} />
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
                    <div className="ml-6 mt-1 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-xs text-zinc-500">
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
              <Link
                href={`/deck/admin/clients/${a.clientId}`}
                title={`Open ${a.clientName}`}
                className="shrink-0 flex items-center px-3 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-950 border-l border-zinc-900 transition-colors"
              >
                →
              </Link>
            </div>
            {isOpen && (
              <div className="px-4 pb-4 pt-2 ml-6 border-t border-zinc-900/60 bg-zinc-950/40">
                <VisitorBreakdown events={visitorEvents} variant={a.variant} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
