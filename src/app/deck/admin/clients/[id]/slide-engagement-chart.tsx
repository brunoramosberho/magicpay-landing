'use client';

import {useMemo, useState} from 'react';
import {deckSlides} from '@/components/deck/slides';

type Datum = {slideId: string; views: number; totalMs: number};
type Metric = 'avg' | 'total';

const SLIDE_ORDER: Record<string, number> = Object.fromEntries(
  deckSlides.map((s, i) => [s.id, i])
);

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

function formatDuration(ms: number): string {
  if (!ms || ms < 1000) return `${Math.round(ms)}ms`;
  const sec = Math.round(ms / 1000);
  if (sec < 60) return `${sec}s`;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  if (min < 60) return `${min}m ${remSec}s`;
  const hr = Math.floor(min / 60);
  const remMin = min % 60;
  return `${hr}h ${remMin}m`;
}

export function SlideEngagementChart({data}: {data: Datum[]}) {
  const [metric, setMetric] = useState<Metric>('avg');

  const rows = useMemo(() => {
    return [...data]
      .map((d) => ({
        ...d,
        avgMs: d.views > 0 ? d.totalMs / d.views : 0,
        order: SLIDE_ORDER[d.slideId] ?? 999,
        label: SLIDE_LABELS[d.slideId] ?? d.slideId
      }))
      .sort((a, b) => a.order - b.order);
  }, [data]);

  const max = useMemo(() => {
    const values = rows.map((r) => (metric === 'avg' ? r.avgMs : r.totalMs));
    return Math.max(...values, 1);
  }, [rows, metric]);

  return (
    <div className="border border-zinc-900 rounded-md bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
        <p className="text-xs text-zinc-500">
          Tiempo promedio por slide a través de todas las sesiones
        </p>
        <div className="inline-flex rounded-md border border-zinc-800 overflow-hidden text-xs">
          <button
            onClick={() => setMetric('avg')}
            className={`px-3 py-1 ${
              metric === 'avg'
                ? 'bg-zinc-800 text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Promedio
          </button>
          <button
            onClick={() => setMetric('total')}
            className={`px-3 py-1 border-l border-zinc-800 ${
              metric === 'total'
                ? 'bg-zinc-800 text-zinc-50'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Total
          </button>
        </div>
      </div>

      <ul className="divide-y divide-zinc-900">
        {rows.map((r) => {
          const value = metric === 'avg' ? r.avgMs : r.totalMs;
          const pct = max > 0 ? (value / max) * 100 : 0;
          return (
            <li key={r.slideId} className="px-4 py-3">
              <div className="flex items-baseline justify-between text-sm mb-1.5 gap-3">
                <span className="text-zinc-200 truncate">{r.label}</span>
                <span className="text-zinc-400 tabular-nums shrink-0">
                  {formatDuration(value)}{' '}
                  <span className="text-zinc-600">
                    · {r.views} view{r.views === 1 ? '' : 's'}
                  </span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/80"
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
