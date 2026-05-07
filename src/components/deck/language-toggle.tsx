'use client';

import {useI18n} from './i18n-context';

export function LanguageToggle() {
  const {locale, setLocale} = useI18n();
  return (
    <div className="deck-lang-toggle" role="group" aria-label="Language">
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
      <style jsx>{`
        .deck-lang-toggle {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font: 500 13px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          letter-spacing: 0.04em;
        }
        button {
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
        button:hover {
          color: var(--mp-ink);
        }
        button.active {
          color: var(--mp-ink);
          font-weight: 500;
        }
        span {
          color: var(--mp-neutral-300);
        }
      `}</style>
    </div>
  );
}
