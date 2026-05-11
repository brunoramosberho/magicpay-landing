'use client';

import {useEffect, useRef, useState} from 'react';
import {useI18n} from './i18n-context';

const LOCALES: {code: 'es' | 'en'; short: string; long: string}[] = [
  {code: 'es', short: 'ES', long: 'Español'},
  {code: 'en', short: 'EN', long: 'English'}
];

export function LanguageToggle() {
  const {locale, setLocale} = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close the mobile popover on outside click / Escape — same UX pattern as
  // the sections menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="deck-lang-toggle"
      role="group"
      aria-label="Language"
    >
      {/* Desktop: both options shown as a quick inline toggle. */}
      <div className="lang-inline" aria-hidden={false}>
        <button
          type="button"
          aria-pressed={locale === 'es'}
          onClick={() => setLocale('es')}
          className={locale === 'es' ? 'active' : ''}
        >
          ES
        </button>
        <span aria-hidden>/</span>
        <button
          type="button"
          aria-pressed={locale === 'en'}
          onClick={() => setLocale('en')}
          className={locale === 'en' ? 'active' : ''}
        >
          EN
        </button>
      </div>

      {/* Mobile: a single pill that opens a popover. */}
      <div className="lang-menu">
        <button
          type="button"
          className="lang-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {LOCALES.find((l) => l.code === locale)?.short ?? 'ES'}
          <svg viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2.5 4.5l3.5 3.5 3.5-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open && (
          <ul className="lang-popup" role="listbox">
            {LOCALES.map((l) => (
              <li key={l.code} role="option" aria-selected={locale === l.code}>
                <button
                  type="button"
                  className={locale === l.code ? 'is-active' : ''}
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                >
                  <span className="lp-short">{l.short}</span>
                  <span className="lp-long">{l.long}</span>
                  {locale === l.code && (
                    <svg viewBox="0 0 16 16" aria-hidden className="lp-check">
                      <path
                        d="M3.5 8.5l3 3 6-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .deck-lang-toggle {
          display: inline-flex;
          align-items: center;
          color: var(--mp-fg-muted);
          font: 500 13px/1 var(--mp-font-body);
          letter-spacing: 0.04em;
        }
        .lang-inline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .lang-inline button {
          background: transparent;
          border: 0;
          padding: 4px 6px;
          cursor: pointer;
          color: inherit;
          font: inherit;
          letter-spacing: inherit;
          border-radius: 4px;
          transition: color 120ms;
        }
        .lang-inline button:hover {
          color: var(--mp-ink);
        }
        .lang-inline button.active {
          color: var(--mp-ink);
        }
        .lang-inline span {
          color: var(--mp-neutral-300);
        }
        .lang-menu {
          display: none;
          position: relative;
        }
        .lang-trigger {
          background: transparent;
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-pill);
          padding: 5px 9px 5px 11px;
          color: var(--mp-ink);
          font: 500 12px/1 var(--mp-font-body);
          letter-spacing: 0.04em;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }
        .lang-trigger svg {
          width: 10px;
          height: 10px;
        }
        .lang-popup {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          margin: 0;
          padding: 4px;
          list-style: none;
          background: var(--mp-white);
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-md);
          box-shadow: var(--mp-shadow-md);
          min-width: 160px;
          z-index: 20;
        }
        .lang-popup li {
          margin: 0;
          padding: 0;
        }
        .lang-popup button {
          width: 100%;
          background: transparent;
          border: 0;
          padding: 9px 12px;
          font: 500 13px/1.1 var(--mp-font-body);
          color: var(--mp-ink);
          letter-spacing: 0.02em;
          border-radius: var(--mp-radius-sm);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-align: left;
        }
        .lang-popup button:hover {
          background: var(--mp-grey);
        }
        .lp-short {
          color: var(--mp-fg-muted);
          font-weight: 500;
          min-width: 22px;
        }
        .lp-long {
          flex: 1;
        }
        .lp-check {
          width: 14px;
          height: 14px;
          color: var(--brand);
        }
        .lang-popup button.is-active .lp-short {
          color: var(--mp-ink);
        }

        @media (max-width: 640px) {
          .lang-inline {
            display: none;
          }
          .lang-menu {
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
}
