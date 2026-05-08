'use client';

import {useEffect, useRef, useState} from 'react';
import {useI18n} from './i18n-context';
import type {SlideDef} from './deck-shell';
import type {StringKey} from '@/lib/deck/i18n';

// Sections map slideId → translation key. Slides that don't exist in `slides`
// (e.g. background filtered out via ?bio=0) are silently skipped.
const SECTIONS: Array<{slideId: string; labelKey: StringKey}> = [
  {slideId: 'cover', labelKey: 'sec_intro'},
  {slideId: 'infrastructure', labelKey: 'sec_context'},
  {slideId: 'problem', labelKey: 'sec_problem'},
  {slideId: 'what-is-magic', labelKey: 'sec_solution'},
  {slideId: 'keyboard-demo', labelKey: 'sec_demos'},
  {slideId: 'security', labelKey: 'sec_security'},
  {slideId: 'implementation', labelKey: 'sec_implementation'},
  {slideId: 'pricing', labelKey: 'sec_pricing'},
  {slideId: 'closing', labelKey: 'sec_close'}
];

export function SectionsMenu({
  slides,
  currentIndex,
  onJump
}: {
  slides: SlideDef[];
  currentIndex: number;
  onJump: (index: number) => void;
}) {
  const {t} = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const items = SECTIONS.map((s) => {
    const idx = slides.findIndex((slide) => slide.id === s.slideId);
    return idx >= 0 ? {...s, index: idx} : null;
  }).filter((s): s is {slideId: string; labelKey: StringKey; index: number} => s !== null);

  // Find which section the current slide belongs to (highest index <= current).
  const currentSection = items.reduce<typeof items[number] | null>((acc, s) => {
    if (s.index <= currentIndex) return s;
    return acc;
  }, null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="sec-wrap" ref={wrapRef}>
      <button
        className="sec-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
        <span className="sec-trigger-label">
          {currentSection ? t(currentSection.labelKey) : t('sec_menu')}
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chev" aria-hidden>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="sec-menu" role="menu">
          {items.map((s) => {
            const active = s.index === currentSection?.index;
            return (
              <button
                key={s.slideId}
                role="menuitem"
                onClick={() => {
                  onJump(s.index);
                  setOpen(false);
                }}
                className={`sec-item ${active ? 'active' : ''}`}
              >
                <span className="sec-num">{String(s.index + 1).padStart(2, '0')}</span>
                <span className="sec-label">{t(s.labelKey)}</span>
                {active && <span className="sec-dot" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
      <style jsx>{`
        .sec-wrap {
          position: relative;
          display: inline-flex;
        }
        .sec-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px 6px 8px;
          background: transparent;
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-pill);
          color: var(--mp-fg);
          font: 500 13px/1 var(--mp-font-body);
          cursor: pointer;
          transition: border-color 120ms, background 120ms;
        }
        .sec-trigger:hover {
          border-color: var(--mp-fg-muted);
          background: var(--mp-grey);
        }
        .sec-trigger :global(svg) {
          width: 14px;
          height: 14px;
        }
        .sec-trigger :global(svg.chev) {
          width: 11px;
          height: 11px;
          opacity: 0.6;
        }
        .sec-trigger-label {
          letter-spacing: -0.005em;
        }
        .sec-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          min-width: 220px;
          background: var(--mp-bg);
          border: 1px solid var(--mp-border-soft);
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.04);
          padding: 6px;
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .sec-item {
          display: grid;
          grid-template-columns: 30px 1fr auto;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          background: transparent;
          border: 0;
          border-radius: 8px;
          color: var(--mp-fg);
          font: 500 13px/1 var(--mp-font-body);
          cursor: pointer;
          text-align: left;
          transition: background 120ms;
        }
        .sec-item:hover {
          background: var(--mp-grey);
        }
        .sec-item.active {
          background: color-mix(in srgb, var(--brand) 8%, var(--mp-bg));
          color: var(--brand);
        }
        .sec-num {
          font: 500 11px/1 ui-monospace, 'SF Mono', Menlo, monospace;
          color: var(--mp-fg-muted);
          font-variant-numeric: tabular-nums;
        }
        .sec-item.active .sec-num {
          color: var(--brand);
        }
        .sec-label {
          letter-spacing: -0.005em;
        }
        .sec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand);
        }
      `}</style>
    </div>
  );
}
