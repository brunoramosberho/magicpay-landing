'use client';

// Interactive 8-step walkthrough that replaces the keyboard demo video.
// Same iPhone frame as the rest of the deck (.deck-phone), reuses the
// MagicKeyboard from the cover for steps 2–4, and exposes a chat view
// that flips from "incoming request" to "payment link sent" at step 7.
//
// Navigation: the slide registers an interceptor with the deck shell so
// the same arrow keys / nav buttons / swipes that move between slides
// first walk through these steps. Each step also has a tappable target
// inside the phone that advances when clicked.

import {useEffect, useMemo, useState} from 'react';
import {useSlideNav} from './deck-shell';
import {MagicKeyboard} from './magic-keyboard';
import {useI18n} from './i18n-context';

type StepId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
const TOTAL_STEPS = 8;

export type KeyboardWalkthroughProps = {
  clientName: string;
  /** Display label for the deck chrome — Banamex / CNBV / etc. Used in the
   *  chat header + keyboard listing so a regulator deck reads "el banco"
   *  in copy but "CNBV" on the phone. */
  chromeLabel: string;
  visitorName: string | null;
  brand: string;
};

export function KeyboardWalkthrough({
  clientName,
  chromeLabel,
  visitorName,
  brand
}: KeyboardWalkthroughProps) {
  const {t} = useI18n();
  const [step, setStep] = useState<StepId>(0);
  const {registerInterceptor} = useSlideNav();

  const visitorFirst =
    visitorName?.trim().split(/\s+/)[0] || t('kbw_visitor_fallback');
  const senderLabel = `${chromeLabel} | ${visitorFirst}`;

  const next = () => setStep((s) => (s < TOTAL_STEPS - 1 ? ((s + 1) as StepId) : s));
  const prev = () => setStep((s) => (s > 0 ? ((s - 1) as StepId) : s));

  // Steer the deck shell's prev/next through our internal step counter
  // before letting it advance slides. Same pattern as FlowSlide.
  useEffect(() => {
    return registerInterceptor((dir) => {
      if (dir === 'next') {
        if (step < TOTAL_STEPS - 1) {
          next();
          return true;
        }
        return false;
      }
      if (step > 0) {
        prev();
        return true;
      }
      return false;
    });
  }, [registerInterceptor, step]);

  const captions = useMemo(
    () => [
      t('kbw_step_0'),
      t('kbw_step_1'),
      t('kbw_step_2'),
      t('kbw_step_3'),
      t('kbw_step_4'),
      t('kbw_step_5').replace('{client}', clientName),
      t('kbw_step_6'),
      t('kbw_step_7')
    ],
    [t, clientName]
  );

  return (
    <div className="kbw-wrap">
      <div className="kbw-phone-col">
        <div className="deck-phone kbw-phone">
          <div className="deck-phone-notch" />
          <div className="deck-phone-screen kbw-screen">
            <StatusBar />
            <ChatPane chromeLabel={chromeLabel} step={step} brand={brand} />
            <BottomPane
              step={step}
              clientName={clientName}
              chromeLabel={chromeLabel}
              senderLabel={senderLabel}
              brand={brand}
              onAdvance={next}
            />
          </div>
        </div>
      </div>

      <div className="kbw-caption">
        <div className="kbw-progress" aria-hidden>
          {Array.from({length: TOTAL_STEPS}).map((_, i) => (
            <span
              key={i}
              className={`kbw-dot ${i === step ? 'on' : ''} ${i < step ? 'done' : ''}`}
              style={i <= step ? {background: brand} : undefined}
            />
          ))}
        </div>
        <p className="kbw-step-num">
          {String(step + 1).padStart(2, '0')} / {String(TOTAL_STEPS).padStart(2, '0')}
        </p>
        <p className="kbw-step-text">{captions[step]}</p>
        <div className="kbw-controls">
          <button
            type="button"
            onClick={prev}
            disabled={step === 0}
            className="kbw-ctrl"
            aria-label="Previous step"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setStep(0)}
            className="kbw-ctrl kbw-restart"
            aria-label="Restart"
          >
            ↺
          </button>
          <button
            type="button"
            onClick={next}
            disabled={step === TOTAL_STEPS - 1}
            className="kbw-ctrl kbw-next"
            style={{background: brand, color: '#fff', borderColor: 'transparent'}}
            aria-label="Next step"
          >
            →
          </button>
        </div>
      </div>

      <style jsx>{`
        .kbw-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(14px, 1.6vh, 22px);
          height: 100%;
          min-height: 0;
        }
        .kbw-phone-col {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          flex: 1;
        }
        .kbw-phone {
          max-height: 100%;
          width: clamp(240px, 22vw, 300px);
        }
        .kbw-screen {
          display: flex;
          flex-direction: column;
          background: #f2f2f7;
          overflow: hidden;
        }
        .kbw-caption {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          max-width: 360px;
          text-align: center;
          flex-shrink: 0;
        }
        .kbw-progress {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .kbw-dot {
          width: 18px;
          height: 4px;
          border-radius: 999px;
          background: var(--mp-neutral-300);
          transition: background 200ms ease;
        }
        .kbw-step-num {
          font: 500 11px/1 ui-monospace, 'SF Mono', Menlo, monospace;
          letter-spacing: 0.08em;
          color: var(--mp-fg-muted);
          margin: 0;
        }
        .kbw-step-text {
          font: 400 clamp(13px, 1.05vw, 15px) / 1.5 var(--mp-font-body);
          color: var(--mp-fg);
          margin: 0;
        }
        .kbw-controls {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }
        .kbw-ctrl {
          width: 40px;
          height: 40px;
          border-radius: var(--mp-radius-pill);
          border: 1px solid var(--mp-border);
          background: var(--mp-bg);
          color: var(--mp-fg);
          font: 500 16px/1 var(--mp-font-body);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 120ms ease, transform 120ms ease;
        }
        .kbw-ctrl:hover:not(:disabled) {
          transform: scale(1.04);
        }
        .kbw-ctrl:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .kbw-restart {
          font-size: 18px;
        }

        @media (max-width: 900px) {
          .kbw-wrap {
            grid-template-columns: 1fr;
            gap: 16px;
            height: auto;
          }
          .kbw-phone-col {
            height: auto;
          }
          .kbw-caption {
            align-items: flex-start;
          }
        }
        @media (max-width: 640px) {
          .kbw-phone-col :global(.deck-phone) {
            width: 260px;
          }
          .kbw-step-text {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Phone subviews ---------------------------

function StatusBar() {
  return (
    <div className="kbw-statusbar" aria-hidden>
      <span className="kbw-time">9:41</span>
      <span className="kbw-status-right">
        <svg viewBox="0 0 16 10" fill="currentColor" aria-hidden>
          <rect x="0" y="6" width="3" height="4" rx="0.5" />
          <rect x="4" y="4" width="3" height="6" rx="0.5" />
          <rect x="8" y="2" width="3" height="8" rx="0.5" />
          <rect x="12" y="0" width="3" height="10" rx="0.5" />
        </svg>
        <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden>
          <path d="M8 2.5C5.5 2.5 3.4 3.3 1.6 4.7L.4 3.5C2.5 1.6 5.1 0.5 8 0.5s5.5 1.1 7.6 3l-1.2 1.2C12.6 3.3 10.5 2.5 8 2.5zm0 3.4c-1.6 0-3 .6-4.1 1.6L2.6 6.3C4 5 5.9 4.2 8 4.2s4 .8 5.4 2.1L12.1 7.5C11 6.5 9.6 5.9 8 5.9zm0 3.5c-.7 0-1.4.2-1.9.7L8 12l1.9-1.9c-.5-.4-1.2-.7-1.9-.7z" />
        </svg>
        <svg viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
          <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
      </span>
      <style jsx>{`
        .kbw-statusbar {
          height: 38px;
          padding: 0 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          color: #000;
          font: 600 13px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          flex-shrink: 0;
        }
        .kbw-status-right {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .kbw-status-right :global(svg) {
          width: 14px;
          height: 10px;
        }
        .kbw-status-right :global(svg:last-child) {
          width: 22px;
        }
      `}</style>
    </div>
  );
}

function ChatPane({
  chromeLabel,
  step,
  brand
}: {
  chromeLabel: string;
  step: StepId;
  brand: string;
}) {
  const {t} = useI18n();
  const linkSent = step === 7;
  return (
    <div className="kbw-chat" aria-hidden>
      <div className="kbw-chat-header">
        <span className="kbw-chat-back">
          <svg viewBox="0 0 12 22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="11 1 1 11 11 21" />
          </svg>
        </span>
        <span className="kbw-chat-avatar">M</span>
        <span className="kbw-chat-name">
          <span>{t('kbw_chat_contact')}</span>
          <span className="kbw-chat-sub">{t('kbw_chat_via')}</span>
        </span>
        <span className="kbw-chat-actions">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="19" cy="12" r="1.6" />
          </svg>
        </span>
      </div>

      <div className="kbw-chat-body">
        <p className="kbw-chat-day">{t('kbw_chat_day')}</p>
        <div className="kbw-bubble in">{t('kbw_chat_msg1')}</div>
        <div className="kbw-bubble in kbw-bubble-amount">
          {t('kbw_chat_msg2')}
        </div>
        {linkSent && (
          <div className="kbw-bubble out kbw-bubble-link">
            <span className="kbw-link-row">
              <span
                className="kbw-link-icon"
                style={{
                  background: brand,
                  ['--brand' as string]: brand
                } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/deck/logos/icon.svg" alt="" aria-hidden />
              </span>
              <span className="kbw-link-meta">
                <span className="kbw-link-amount">$50.00 MXN</span>
                <span className="kbw-link-sub">
                  {t('kbw_chat_via')} {chromeLabel}
                </span>
              </span>
            </span>
            <span className="kbw-link-url">mgic.me/p/x9k</span>
            <span className="kbw-bubble-meta">
              <span>{t('kbw_chat_sent_just')}</span>
              <span>
                <svg viewBox="0 0 14 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="1 6 5 10 13 1" />
                  <polyline points="4 6 8 10" />
                </svg>
              </span>
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .kbw-chat {
          background: linear-gradient(180deg, #ECE5DD 0%, #DCD5C7 100%);
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .kbw-chat-header {
          background: #00B6B0;
          color: #fff;
          padding: 6px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .kbw-chat-back :global(svg) {
          width: 10px;
          height: 14px;
        }
        .kbw-chat-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.22);
          color: #fff;
          font: 700 13px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .kbw-chat-name {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .kbw-chat-name > span:first-child {
          font: 600 13px/1.1 -apple-system, 'SF Pro', system-ui, sans-serif;
        }
        .kbw-chat-sub {
          font-size: 10px;
          opacity: 0.85;
        }
        .kbw-chat-actions :global(svg) {
          width: 14px;
          height: 14px;
        }
        .kbw-chat-body {
          flex: 1;
          padding: 8px 10px 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .kbw-chat-day {
          align-self: center;
          background: rgba(0, 0, 0, 0.06);
          color: rgba(0, 0, 0, 0.55);
          font: 500 9px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          padding: 3px 8px;
          border-radius: 6px;
          margin: 0 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .kbw-bubble {
          padding: 5px 9px 4px;
          max-width: 75%;
          border-radius: 8px;
          font: 400 11px/1.3 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
          position: relative;
        }
        .kbw-bubble.in {
          background: #fff;
          align-self: flex-start;
          border-top-left-radius: 0;
        }
        .kbw-bubble.out {
          background: #DCF8C6;
          align-self: flex-end;
          border-top-right-radius: 0;
        }
        .kbw-bubble-amount {
          font-weight: 500;
        }
        .kbw-bubble-link {
          padding: 6px 8px;
          width: 78%;
          max-width: 78%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .kbw-link-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kbw-link-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kbw-link-icon :global(img) {
          width: 60%;
          height: 60%;
          filter: brightness(0) invert(1);
        }
        .kbw-link-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .kbw-link-amount {
          font: 600 12px/1.1 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #1a1a1a;
        }
        .kbw-link-sub {
          font-size: 9px;
          color: rgba(0, 0, 0, 0.55);
        }
        .kbw-link-url {
          font: 500 9px/1 -apple-system, 'SF Mono', Menlo, monospace;
          color: rgba(0, 0, 0, 0.5);
          word-break: break-all;
        }
        .kbw-bubble-meta {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 3px;
          font: 400 8px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 1px;
        }
        .kbw-bubble-meta :global(svg) {
          width: 10px;
          height: 8px;
          color: #4FC3F7;
        }
      `}</style>
    </div>
  );
}

function BottomPane({
  step,
  clientName,
  chromeLabel,
  senderLabel,
  brand,
  onAdvance
}: {
  step: StepId;
  clientName: string;
  chromeLabel: string;
  senderLabel: string;
  brand: string;
  onAdvance: () => void;
}) {
  // Steps 5–7 dim the chat under a full-screen overlay (FaceID / loader /
  // success), so the bottom pane is empty for those. Step 7 also re-renders
  // the chat above with the payment-link bubble already in it.
  if (step === 5) return <FaceIdOverlay clientName={clientName} onTap={onAdvance} />;
  if (step === 6) return <LoadingOverlay brand={brand} onTap={onAdvance} />;
  if (step === 7) return null;

  return (
    <div className="kbw-bottom">
      <div className="kbw-input-bar" aria-hidden>
        <span className="kbw-input-plus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span className="kbw-input-field">
          {step >= 2 && step <= 4 ? '' : 'Message'}
        </span>
        {step < 2 && (
          <svg className="kbw-input-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="9" y="3" width="6" height="13" rx="3" />
            <path d="M19 11v1a7 7 0 01-14 0v-1" />
            <line x1="12" y1="20" x2="12" y2="23" />
          </svg>
        )}
      </div>
      {step === 0 && <QwertyKeyboard onTapGlobe={onAdvance} />}
      {step === 1 && <KeyboardSelector clientName={chromeLabel} onSelect={onAdvance} />}
      {(step === 2 || step === 3 || step === 4) && (
        <div className="kbw-magic-wrap">
          <MagicKeyboard
            amount={step === 2 ? '0' : '50'}
            color={brand}
            showImessageBar={false}
            recipientName={senderLabel}
          />
          {/* Step 2: tapping any digit "types" 50 — entire keys grid is the
              target. Step 3: tap target focuses on the Send button. Step 4:
              the send button shows a press flash; clicking anywhere continues
              to FaceID. */}
          {step === 2 && (
            <button
              type="button"
              className="kbw-tap-zone kbw-tap-keys"
              onClick={onAdvance}
              aria-label="Type amount"
            >
              <span className="kbw-tap kbw-tap-pulse" aria-hidden />
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              className="kbw-tap-zone kbw-tap-send-zone"
              onClick={onAdvance}
              aria-label="Tap Send"
            >
              <span className="kbw-tap kbw-tap-pulse" aria-hidden />
            </button>
          )}
          {step === 4 && (
            <button
              type="button"
              className="kbw-tap-zone kbw-tap-send-zone"
              onClick={onAdvance}
              aria-label="Continue"
            >
              <span className="kbw-send-press" aria-hidden />
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .kbw-bottom {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          background: #fff;
        }
        .kbw-input-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 8px 4px;
          background: #fff;
        }
        .kbw-input-plus {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #f0f0f0;
          color: #8e8e93;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kbw-input-plus :global(svg) {
          width: 12px;
          height: 12px;
        }
        .kbw-input-field {
          flex: 1;
          height: 22px;
          border-radius: 999px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font: 400 10px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #8e8e93;
        }
        .kbw-input-mic {
          width: 14px;
          height: 14px;
          color: #8e8e93;
          flex-shrink: 0;
        }
        .kbw-magic-wrap {
          position: relative;
          padding: 0 4px 6px;
        }
        .kbw-magic-wrap :global(.kb-preview) {
          max-width: none;
          border: 0;
          border-radius: 0;
          box-shadow: none;
        }
        .kbw-tap-zone {
          position: absolute;
          background: transparent;
          border: 0;
          padding: 0;
          cursor: pointer;
          z-index: 4;
        }
        .kbw-tap-zone:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }
        /* Cover the numeric keypad area (everything below the toolbar) so any
           tap on a digit advances the step. */
        .kbw-tap-keys {
          left: 12px;
          right: 12px;
          top: 58px;
          bottom: 50px;
          border-radius: 8px;
        }
        /* Send pill spans full width inside the keyboard. */
        .kbw-tap-send-zone {
          left: 8px;
          right: 8px;
          bottom: 32px;
          height: 36px;
          border-radius: 8px;
        }
        .kbw-tap {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.75);
          border: 2px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.18),
            0 6px 18px rgba(0, 0, 0, 0.22);
          pointer-events: none;
          animation: kbw-pulse 1.4s ease-out infinite;
        }
        .kbw-send-press {
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.35);
          pointer-events: none;
          animation: kbw-press-flash 0.6s ease-out forwards;
        }
        @keyframes kbw-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.95;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.7);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.7);
            opacity: 0;
          }
        }
        @keyframes kbw-press-flash {
          0% {
            background: rgba(255, 255, 255, 0.4);
          }
          100% {
            background: rgba(0, 0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------- Step 0: QWERTY keyboard ----------------------
// Minimal iOS-style QWERTY. The globe is the tap target — clicking it
// advances to step 1.

function QwertyKeyboard({onTapGlobe}: {onTapGlobe: () => void}) {
  const rows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm'
  ];
  return (
    <div className="kb-qw" aria-hidden>
      {rows.map((row, ri) => (
        <div key={ri} className={`kb-qw-row kb-qw-row-${ri}`}>
          {ri === 2 && <span className="kb-qw-shift">⇧</span>}
          {[...row].map((k) => (
            <span key={k} className="kb-qw-key">
              {k}
            </span>
          ))}
          {ri === 2 && <span className="kb-qw-back">⌫</span>}
        </div>
      ))}
      <div className="kb-qw-row kb-qw-bottom">
        <span className="kb-qw-modal">123</span>
        <button
          type="button"
          className="kb-qw-globe"
          onClick={onTapGlobe}
          aria-label="Switch keyboard"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          <span className="kb-qw-globe-pulse" />
        </button>
        <span className="kb-qw-space">space</span>
        <span className="kb-qw-return">return</span>
      </div>
      <style jsx>{`
        .kb-qw {
          background: #d1d3d9;
          padding: 5px 3px 8px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex-shrink: 0;
        }
        .kb-qw-row {
          display: flex;
          gap: 4px;
          justify-content: center;
        }
        .kb-qw-row-1 {
          padding: 0 12px;
        }
        .kb-qw-key {
          flex: 1;
          height: 28px;
          background: #fff;
          color: #111;
          border-radius: 4px;
          font: 400 13px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.18);
        }
        .kb-qw-shift,
        .kb-qw-back {
          width: 26px;
          height: 28px;
          border-radius: 4px;
          background: #adb1ba;
          color: #111;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.18);
        }
        .kb-qw-bottom {
          gap: 4px;
        }
        .kb-qw-modal,
        .kb-qw-globe,
        .kb-qw-return {
          height: 28px;
          background: #adb1ba;
          color: #111;
          border-radius: 4px;
          font: 400 11px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          border: 0;
          cursor: pointer;
        }
        .kb-qw-globe {
          width: 30px;
          padding: 0;
          position: relative;
        }
        .kb-qw-globe :global(svg) {
          width: 16px;
          height: 16px;
          color: #111;
        }
        .kb-qw-globe-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 8px;
          border: 2px solid var(--brand, #306FF6);
          opacity: 0;
          animation: kb-qw-pulse 1.6s ease-out infinite;
          pointer-events: none;
        }
        .kb-qw-space {
          flex: 1;
          background: #fff;
          height: 28px;
          color: #111;
          font-size: 11px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @keyframes kb-qw-pulse {
          0% {
            opacity: 0.9;
            transform: scale(0.95);
          }
          70% {
            opacity: 0;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// ---------------------- Step 1: Keyboard selector ----------------------
// iOS keyboard picker — three rows, "magic - {client}" is highlighted as
// the tap target.

function KeyboardSelector({
  clientName,
  onSelect
}: {
  clientName: string;
  onSelect: () => void;
}) {
  const rows = [
    {label: 'English (US)'},
    {label: 'Español (México)'},
    {label: 'Emoji'}
  ];
  return (
    <div className="kb-sel" aria-hidden>
      <div className="kb-sel-list">
        {rows.map((r) => (
          <div key={r.label} className="kb-sel-row">
            {r.label}
          </div>
        ))}
        <button type="button" className="kb-sel-row kb-sel-magic" onClick={onSelect}>
          <span className="kb-sel-magic-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deck/logos/icon.svg" alt="" aria-hidden />
          </span>
          <span className="kb-sel-magic-label">
            magic — {clientName}
          </span>
          <span className="kb-sel-check">✓</span>
          <span className="kb-sel-pulse" aria-hidden />
        </button>
        <div className="kb-sel-row kb-sel-settings">Keyboard Settings…</div>
      </div>
      <style jsx>{`
        .kb-sel {
          background: rgba(217, 217, 217, 0.96);
          padding: 10px 8px 8px;
          flex-shrink: 0;
          backdrop-filter: blur(20px);
        }
        .kb-sel-list {
          background: rgba(255, 255, 255, 0.85);
          border-radius: 10px;
          overflow: hidden;
        }
        .kb-sel-row {
          padding: 9px 12px;
          font: 400 12px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kb-sel-row:last-child {
          border-bottom: 0;
        }
        .kb-sel-magic {
          background: rgba(48, 111, 246, 0.08);
          border: 0;
          width: 100%;
          text-align: left;
          padding: 9px 12px;
          color: #111;
          font: 600 12px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          cursor: pointer;
          position: relative;
        }
        .kb-sel-magic:hover {
          background: rgba(48, 111, 246, 0.16);
        }
        .kb-sel-magic-icon {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          background: var(--brand, #306FF6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kb-sel-magic-icon :global(img) {
          width: 60%;
          height: 60%;
          filter: brightness(0) invert(1);
        }
        .kb-sel-magic-label {
          flex: 1;
        }
        .kb-sel-check {
          color: var(--brand, #306FF6);
          font-size: 14px;
          font-weight: 600;
        }
        .kb-sel-pulse {
          position: absolute;
          inset: -2px;
          border-radius: 6px;
          border: 2px solid var(--brand, #306FF6);
          opacity: 0;
          animation: kb-sel-pulse 1.5s ease-out infinite;
          pointer-events: none;
        }
        .kb-sel-settings {
          color: #007aff;
        }
        @keyframes kb-sel-pulse {
          0% { opacity: 0.9; transform: scale(0.97); }
          70% { opacity: 0; transform: scale(1.05); }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ---------------------- Step 5: FaceID overlay ----------------------

function FaceIdOverlay({clientName, onTap}: {clientName: string; onTap: () => void}) {
  return (
    <div className="kbw-fid" onClick={onTap} role="button" aria-label="Continue">
      <div className="kbw-fid-icon">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 18V12a4 4 0 014-4h6M46 8h6a4 4 0 014 4v6M8 46v6a4 4 0 004 4h6M46 56h6a4 4 0 004-4v-6" />
          <line x1="22" y1="24" x2="22" y2="30" />
          <line x1="42" y1="24" x2="42" y2="30" />
          <path d="M32 26v10l-3 2" />
          <path d="M22 42c2.5 2 6 3 10 3s7.5-1 10-3" />
        </svg>
      </div>
      <p className="kbw-fid-title">Face ID</p>
      <p className="kbw-fid-sub">Iniciando sesión en {clientName}</p>
      <style jsx>{`
        .kbw-fid {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #fff;
          cursor: pointer;
          z-index: 6;
          animation: kbw-fade-in 0.25s ease-out;
        }
        .kbw-fid-icon :global(svg) {
          width: 64px;
          height: 64px;
          color: #fff;
          animation: kbw-scan 1.6s ease-in-out infinite;
        }
        .kbw-fid-title {
          font: 600 16px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          margin: 0;
        }
        .kbw-fid-sub {
          font: 400 12px/1.3 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          padding: 0 24px;
          text-align: center;
        }
        @keyframes kbw-scan {
          0%, 100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes kbw-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ---------------------- Step 6: Loader ----------------------

function LoadingOverlay({brand, onTap}: {brand: string; onTap: () => void}) {
  const {t} = useI18n();
  return (
    <div className="kbw-load" onClick={onTap} role="button" aria-label="Continue">
      <span
        className="kbw-load-spin"
        style={{borderTopColor: brand, color: brand}}
        aria-hidden
      />
      <p className="kbw-load-title">{t('kbw_loader_title')}</p>
      <p className="kbw-load-sub">{t('kbw_loader_sub')}</p>
      <style jsx>{`
        .kbw-load {
          position: absolute;
          inset: 0;
          background: rgba(8, 12, 24, 0.85);
          backdrop-filter: blur(18px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #fff;
          cursor: pointer;
          z-index: 6;
          animation: kbw-fade-in 0.2s ease-out;
        }
        .kbw-load-spin {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.15);
          border-top-color: #fff;
          animation: kbw-spin 0.9s linear infinite;
        }
        .kbw-load-title {
          font: 600 14px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
          margin: 0;
        }
        .kbw-load-sub {
          font: 400 11px/1.4 -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
          padding: 0 24px;
          text-align: center;
        }
        @keyframes kbw-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kbw-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
