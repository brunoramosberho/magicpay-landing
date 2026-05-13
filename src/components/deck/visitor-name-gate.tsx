'use client';

import {useState} from 'react';
import {useI18n} from './i18n-context';

/**
 * A name is valid if, after trimming, it contains at least two Unicode
 * letter characters. This rejects empty strings, single dots, "a", "...",
 * "12345", or emoji-only inputs, while still accepting accented names
 * (José, Müller, محمد, …) and short hypocorisms ("Jo", "Ал").
 */
function isValidName(raw: string): boolean {
  const trimmed = raw.trim();
  if (trimmed.length < 2) return false;
  const letters = trimmed.match(/\p{L}/gu) ?? [];
  return letters.length >= 2;
}

export function VisitorNameGate({
  brand,
  onSubmit
}: {
  brand: string;
  onSubmit: (name: string) => void;
}) {
  const {t} = useI18n();
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const valid = isValidName(name);
  // Only show the hint after the user has tried submitting or blurred a
  // non-empty value — typing the first letter shouldn't trigger an error.
  const showHint = touched && !valid && name.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit(name);
  };

  return (
    <div className="name-gate-overlay" role="dialog" aria-modal="true">
      <div className="name-gate-card">
        <div className="name-gate-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/logos/icon.svg" alt="" aria-hidden />
          <span>magic</span>
        </div>
        <h2 className="name-gate-title">{t('name_title')}</h2>
        <p className="name-gate-subtitle">{t('name_subtitle')}</p>
        <form onSubmit={handleSubmit} className="name-gate-form" noValidate>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name.length > 0 && setTouched(true)}
            placeholder={t('name_placeholder')}
            maxLength={80}
            autoFocus
            autoComplete="given-name"
            className={`name-gate-input ${showHint ? 'is-invalid' : ''}`}
            aria-invalid={showHint || undefined}
            aria-describedby={showHint ? 'name-gate-hint' : undefined}
          />
          <p
            id="name-gate-hint"
            className={`name-gate-hint ${showHint ? 'is-visible' : ''}`}
            role={showHint ? 'alert' : undefined}
          >
            {t('name_hint')}
          </p>
          <button
            type="submit"
            className="name-gate-cta"
            style={{background: brand}}
            disabled={!valid}
          >
            {t('name_cta')}
          </button>
        </form>
      </div>
      <style jsx>{`
        .name-gate-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(15, 17, 22, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 24px;
        }
        .name-gate-card {
          background: var(--mp-bg);
          color: var(--mp-fg);
          border: 1px solid var(--mp-border-soft);
          border-radius: 16px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18),
            0 8px 24px rgba(0, 0, 0, 0.08);
          padding: 32px;
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .name-gate-mark {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font: 500 14px/1 var(--mp-font-display);
          color: var(--mp-fg-muted);
          margin-bottom: 4px;
        }
        .name-gate-mark :global(img) {
          width: 18px;
          height: 18px;
        }
        .name-gate-title {
          font: 600 22px/1.2 var(--mp-font-display);
          letter-spacing: -0.01em;
          margin: 0;
        }
        .name-gate-subtitle {
          font: 400 14px/1.45 var(--mp-font-body);
          color: var(--mp-fg-muted);
          margin: 0 0 8px;
        }
        .name-gate-form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .name-gate-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid var(--mp-border);
          background: var(--mp-bg);
          color: var(--mp-fg);
          font: 500 15px/1.2 var(--mp-font-body);
          outline: none;
          transition: border-color 120ms, box-shadow 120ms;
        }
        .name-gate-input:focus {
          border-color: var(--brand);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand) 20%, transparent);
        }
        .name-gate-input.is-invalid {
          border-color: #e26b6b;
        }
        .name-gate-input.is-invalid:focus {
          box-shadow: 0 0 0 3px rgba(226, 107, 107, 0.18);
        }
        .name-gate-hint {
          font: 500 12px/1.4 var(--mp-font-body);
          color: #c43e3e;
          margin: 0;
          padding: 0 2px;
          min-height: 14px;
          opacity: 0;
          transform: translateY(-2px);
          transition: opacity 160ms ease, transform 160ms ease;
        }
        .name-gate-hint.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .name-gate-cta {
          padding: 12px 16px;
          border: 0;
          border-radius: 10px;
          color: #fff;
          font: 500 14px/1 var(--mp-font-body);
          cursor: pointer;
          box-shadow: var(--mp-shadow-cta);
          transition: opacity 120ms, transform 120ms;
          margin-top: 4px;
        }
        .name-gate-cta:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .name-gate-cta:not(:disabled):hover {
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}
