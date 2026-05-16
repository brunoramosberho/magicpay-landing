'use client';

// Interactive walkthrough that replaces the keyboard demo video. Open
// composition (no iPhone frame) — floating chat bubbles above a soft
// keyboard panel, same vibe as the cover slide. Reuses MagicKeyboard for
// the magic state and an inline iOS-style QWERTY for the rest.
//
// 7 steps. Each step can be advanced by tapping the highlighted target
// inside the surface, or by pressing the deck's Next button — the slide
// registers a SlideNav interceptor so the same arrow keys / nav buttons
// walk through the steps before yielding control to the deck.

import {useEffect, useMemo, useState} from 'react';
import {useSlideNav} from './deck-shell';
import {MagicKeyboard} from './magic-keyboard';
import {useI18n} from './i18n-context';

type StepId = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const TOTAL_STEPS = 7;

export type KeyboardWalkthroughProps = {
  clientName: string;
  /** Display label for the deck chrome — Banamex / CNBV / etc. Used in
   *  the keyboard picker row so a regulator deck reads "el banco" in
   *  copy but "CNBV" on the phone. */
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

  const next = () =>
    setStep((s) => (s < TOTAL_STEPS - 1 ? ((s + 1) as StepId) : s));
  const prev = () =>
    setStep((s) => (s > 0 ? ((s - 1) as StepId) : s));

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
      t('kbw_step_4').replace('{client}', clientName),
      t('kbw_step_5'),
      t('kbw_step_6')
    ],
    [t, clientName]
  );

  return (
    <div className="kbw-wrap">
      <div className="kbw-stage">
        <ChatBubbles step={step} chromeLabel={chromeLabel} brand={brand} />
        <KeyboardSurface
          step={step}
          clientName={clientName}
          chromeLabel={chromeLabel}
          senderLabel={senderLabel}
          brand={brand}
          onAdvance={next}
        />
      </div>

      <div className="kbw-caption">
        <div className="kbw-progress" aria-hidden>
          {Array.from({length: TOTAL_STEPS}).map((_, i) => (
            <span
              key={i}
              className={`kbw-dot ${i === step ? 'on' : ''}`}
              style={i <= step ? {background: brand} : undefined}
            />
          ))}
        </div>
        <p className="kbw-step-num">
          {String(step + 1).padStart(2, '0')} /{' '}
          {String(TOTAL_STEPS).padStart(2, '0')}
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
            title={t('kbw_restart_hint')}
          >
            ↺
          </button>
          <button
            type="button"
            onClick={next}
            disabled={step === TOTAL_STEPS - 1}
            className="kbw-ctrl kbw-next"
            style={{
              background: brand,
              color: '#fff',
              borderColor: 'transparent'
            }}
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
          gap: clamp(16px, 1.8vh, 26px);
          height: 100%;
          min-height: 0;
        }
        .kbw-stage {
          width: clamp(260px, 24vw, 340px);
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          min-height: 0;
          justify-content: flex-end;
        }
        .kbw-caption {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          max-width: 380px;
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
          transition: background 220ms ease;
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
            height: auto;
          }
        }
        @media (max-width: 640px) {
          .kbw-stage {
            width: 280px;
          }
          .kbw-step-text {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Chat bubbles ---------------------------

function ChatBubbles({
  step,
  chromeLabel,
  brand
}: {
  step: StepId;
  chromeLabel: string;
  brand: string;
}) {
  const {t} = useI18n();
  const linkSent = step === 6;
  return (
    <div className="kbw-bubbles" aria-hidden>
      <div className="kbw-bubble in">{t('kbw_chat_msg1')}</div>
      <div className="kbw-bubble in">{t('kbw_chat_msg2')}</div>
      {linkSent && (
        <div className="kbw-bubble out kbw-bubble-link">
          <span
            className="kbw-link-icon"
            style={{background: brand}}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deck/logos/icon.svg" alt="" aria-hidden />
          </span>
          <span className="kbw-link-meta">
            <span className="kbw-link-amount">$50 MXN</span>
            <span className="kbw-link-sub">
              {t('kbw_chat_via')} {chromeLabel}
            </span>
          </span>
        </div>
      )}
      <style jsx>{`
        .kbw-bubbles {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          padding: 0 4px;
          min-height: 90px;
        }
        .kbw-bubble {
          padding: 9px 14px;
          border-radius: 18px;
          font: 400 13px/1.35
            -apple-system, 'SF Pro', system-ui, sans-serif;
          max-width: 78%;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .kbw-bubble.in {
          background: #fff;
          color: #111;
          border-bottom-left-radius: 4px;
        }
        .kbw-bubble.out {
          align-self: flex-end;
          color: #fff;
          border-bottom-right-radius: 4px;
          background: var(--brand, #306FF6);
        }
        .kbw-bubble-link {
          padding: 8px 10px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          color: #111;
          border: 1px solid var(--mp-border-soft);
          animation: kbw-pop 0.35s cubic-bezier(0.18, 0.74, 0.32, 1.34);
        }
        .kbw-link-icon {
          width: 32px;
          height: 32px;
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
          gap: 1px;
        }
        .kbw-link-amount {
          font: 600 13px/1.1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
        }
        .kbw-link-sub {
          font-size: 10px;
          color: rgba(0, 0, 0, 0.5);
        }
        @keyframes kbw-pop {
          0% {
            transform: translateY(8px) scale(0.94);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Keyboard surface ---------------------------

function KeyboardSurface({
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
  return (
    <div className="kbw-surface" style={{['--brand' as string]: brand}}>
      {/* Messaging-app input bar — always visible, anchors the surface */}
      <InputBar showSendArrow={false} />

      {/* Step-specific body */}
      {(step === 0 || step === 1 || step === 6) && (
        <Qwerty
          onTapGlobe={step === 0 ? onAdvance : undefined}
          pulseGlobe={step === 0}
        />
      )}

      {(step === 2 || step === 3) && (
        <div className="kbw-magic-wrap">
          <MagicKeyboard
            amount={step === 2 ? '0' : '50'}
            color={brand}
            showImessageBar={false}
            recipientName={senderLabel}
          />
          {step === 2 && (
            <button
              type="button"
              className="kbw-tap-zone kbw-tap-keys"
              onClick={onAdvance}
              aria-label="Type amount"
            >
              <span className="kbw-tap-pulse" aria-hidden />
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              className="kbw-tap-zone kbw-tap-send"
              onClick={onAdvance}
              aria-label="Tap Send"
            >
              <span className="kbw-tap-pulse" aria-hidden />
            </button>
          )}
        </div>
      )}

      {/* Step 1: keyboard picker pops over the bottom row of the QWERTY,
          exactly like iOS does when you long-press the globe. */}
      {step === 1 && (
        <KeyboardSelector chromeLabel={chromeLabel} onSelect={onAdvance} />
      )}

      {/* Overlays cover the whole surface (chat stays untouched above) */}
      {step === 4 && <FaceIdOverlay clientName={clientName} onTap={onAdvance} />}
      {step === 5 && <LoaderOverlay brand={brand} onTap={onAdvance} />}

      <style jsx>{`
        .kbw-surface {
          position: relative;
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.06);
        }
        .kbw-magic-wrap {
          position: relative;
          padding: 0;
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
          z-index: 5;
        }
        .kbw-tap-zone:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }
        .kbw-tap-keys {
          left: 12px;
          right: 12px;
          top: 52px;
          bottom: 56px;
          border-radius: 8px;
        }
        .kbw-tap-send {
          left: 8px;
          right: 8px;
          bottom: 26px;
          height: 34px;
          border-radius: 8px;
        }
        .kbw-tap-pulse {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.85);
          border: 2px solid rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.18),
            0 6px 18px rgba(0, 0, 0, 0.22);
          pointer-events: none;
          animation: kbw-tap-anim 1.5s ease-out infinite;
        }
        @keyframes kbw-tap-anim {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.95;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Input bar ---------------------------

function InputBar({showSendArrow}: {showSendArrow: boolean}) {
  return (
    <div className="kbw-input" aria-hidden>
      <span className="kbw-input-plus">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <span className="kbw-input-field">Message</span>
      {showSendArrow ? (
        <span className="kbw-input-send" aria-hidden>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M5 12l14-7-4 14-3-7-7-0z" />
          </svg>
        </span>
      ) : (
        <svg className="kbw-input-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="9" y="3" width="6" height="13" rx="3" />
          <path d="M19 11v1a7 7 0 01-14 0v-1" />
          <line x1="12" y1="20" x2="12" y2="23" />
        </svg>
      )}
      <style jsx>{`
        .kbw-input {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: #fff;
        }
        .kbw-input-plus {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #f0f0f0;
          color: #8e8e93;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kbw-input-plus :global(svg) {
          width: 13px;
          height: 13px;
        }
        .kbw-input-field {
          flex: 1;
          height: 26px;
          border-radius: 999px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font: 400 12px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #8e8e93;
        }
        .kbw-input-mic {
          width: 16px;
          height: 16px;
          color: #8e8e93;
          flex-shrink: 0;
        }
        .kbw-input-send {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--brand, #306FF6);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kbw-input-send :global(svg) {
          width: 14px;
          height: 14px;
          transform: translateX(-1px);
        }
      `}</style>
    </div>
  );
}

// --------------------------- Modern iOS QWERTY ---------------------------
// Matches the Figma reference: 3 letter rows, ABC/space/return row, then
// a thin row below with globe (left) + mic (right). Globe is the tap
// target for step 0; pulses to draw the eye.

function Qwerty({
  onTapGlobe,
  pulseGlobe
}: {
  onTapGlobe?: () => void;
  pulseGlobe?: boolean;
}) {
  const row1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const row2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const row3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  return (
    <div className="qw" aria-hidden>
      <div className="qw-suggest">
        <span className="qw-sug">&ldquo;The&rdquo;</span>
        <span className="qw-sug">the</span>
        <span className="qw-sug">to</span>
      </div>
      <div className="qw-rows">
        <div className="qw-row">
          {row1.map((k) => (
            <span key={k} className="qw-key">
              {k}
            </span>
          ))}
        </div>
        <div className="qw-row qw-row-2">
          {row2.map((k) => (
            <span key={k} className="qw-key">
              {k}
            </span>
          ))}
        </div>
        <div className="qw-row qw-row-3">
          <span className="qw-key qw-mod">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 14l7-8 7 8M9 14v6h6v-6" />
            </svg>
          </span>
          {row3.map((k) => (
            <span key={k} className="qw-key">
              {k}
            </span>
          ))}
          <span className="qw-key qw-mod">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 5H8L3 12l5 7h13a2 2 0 002-2V7a2 2 0 00-2-2z" />
              <path d="M14 9l-4 6M10 9l4 6" />
            </svg>
          </span>
        </div>
        <div className="qw-row qw-row-bottom">
          <span className="qw-key qw-mod-wide">ABC</span>
          <span className="qw-space">space</span>
          <span className="qw-return">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 14l-4-4 4-4" />
              <path d="M5 10h11a4 4 0 014 4v3" />
            </svg>
          </span>
        </div>
      </div>
      <div className="qw-foot">
        <button
          type="button"
          className="qw-foot-btn qw-foot-globe"
          onClick={onTapGlobe}
          aria-label="Switch keyboard"
          disabled={!onTapGlobe}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 014 9 14 14 0 01-4 9 14 14 0 01-4-9 14 14 0 014-9z" />
          </svg>
          {pulseGlobe && <span className="qw-globe-pulse" aria-hidden />}
        </button>
        <button
          type="button"
          className="qw-foot-btn qw-foot-mic"
          disabled
          aria-label="Dictation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="9" y="3" width="6" height="13" rx="3" />
            <path d="M19 11v1a7 7 0 01-14 0v-1" />
            <line x1="12" y1="20" x2="12" y2="23" />
          </svg>
        </button>
      </div>
      <style jsx>{`
        .qw {
          background: #d1d3da;
          padding: 4px 3px 0;
          display: flex;
          flex-direction: column;
        }
        .qw-suggest {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: 7px 4px;
          font: 400 13px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
        }
        .qw-sug {
          text-align: center;
          padding: 4px 0;
          border-right: 1px solid rgba(0, 0, 0, 0.12);
        }
        .qw-sug:last-child {
          border-right: 0;
        }
        .qw-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .qw-row {
          display: flex;
          gap: 4px;
          justify-content: center;
        }
        .qw-row-2 {
          padding: 0 18px;
        }
        .qw-row-3 {
          padding: 0;
        }
        .qw-key {
          flex: 1;
          height: 32px;
          background: #fff;
          color: #111;
          border-radius: 5px;
          font: 400 16px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.32);
        }
        .qw-mod {
          background: #adb1ba;
          color: #111;
          max-width: 36px;
          flex: 0 0 36px;
        }
        .qw-mod :global(svg) {
          width: 16px;
          height: 16px;
        }
        .qw-row-bottom {
          padding: 0;
        }
        .qw-mod-wide {
          flex: 0 0 48px;
          height: 32px;
          background: #adb1ba;
          color: #111;
          font-size: 13px;
          border-radius: 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.32);
        }
        .qw-space {
          flex: 1;
          height: 32px;
          background: #fff;
          color: #111;
          font: 400 13px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          border-radius: 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.32);
        }
        .qw-return {
          flex: 0 0 70px;
          height: 32px;
          background: var(--brand, #306FF6);
          color: #fff;
          border-radius: 5px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.32);
        }
        .qw-return :global(svg) {
          width: 18px;
          height: 18px;
        }
        .qw-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 12px 6px;
        }
        .qw-foot-btn {
          background: transparent;
          border: 0;
          padding: 6px;
          color: #444;
          cursor: pointer;
          position: relative;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .qw-foot-btn:disabled {
          cursor: default;
        }
        .qw-foot-btn :global(svg) {
          width: 18px;
          height: 18px;
        }
        .qw-foot-globe:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.05);
        }
        .qw-globe-pulse {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid var(--brand, #306FF6);
          opacity: 0;
          animation: qw-pulse 1.5s ease-out infinite;
          pointer-events: none;
        }
        @keyframes qw-pulse {
          0% {
            opacity: 0.9;
            transform: scale(0.9);
          }
          70% {
            opacity: 0;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Keyboard selector ---------------------------
// iOS-style picker that pops above the globe. Magic row is the tap target.

function KeyboardSelector({
  chromeLabel,
  onSelect
}: {
  chromeLabel: string;
  onSelect: () => void;
}) {
  return (
    <div className="kb-sel-wrap" aria-hidden>
      <div className="kb-sel">
        <div className="kb-sel-row">English (US)</div>
        <div className="kb-sel-row">Español (México)</div>
        <div className="kb-sel-row">Emoji</div>
        <button type="button" className="kb-sel-row kb-sel-magic" onClick={onSelect}>
          <span className="kb-sel-icon">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/deck/logos/icon.svg" alt="" aria-hidden />
          </span>
          <span className="kb-sel-label">magic — {chromeLabel}</span>
          <span className="kb-sel-pulse" aria-hidden />
        </button>
        <div className="kb-sel-row kb-sel-settings">Keyboard Settings…</div>
      </div>
      <style jsx>{`
        .kb-sel-wrap {
          background: #d1d3da;
          padding: 12px 14px 16px;
        }
        .kb-sel {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.18),
            0 2px 4px rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(20px);
        }
        .kb-sel-row {
          padding: 11px 14px;
          font: 400 14px/1.1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
        }
        .kb-sel-row:last-child {
          border-bottom: 0;
        }
        .kb-sel-magic {
          width: 100%;
          text-align: left;
          padding: 11px 14px;
          color: #111;
          font: 600 14px/1.1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          background: color-mix(in srgb, var(--brand, #306FF6) 10%, transparent);
          border: 0;
          cursor: pointer;
          position: relative;
        }
        .kb-sel-magic:hover {
          background: color-mix(in srgb, var(--brand, #306FF6) 18%, transparent);
        }
        .kb-sel-icon {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: var(--brand, #306FF6);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kb-sel-icon :global(img) {
          width: 60%;
          height: 60%;
          filter: brightness(0) invert(1);
        }
        .kb-sel-label {
          flex: 1;
        }
        .kb-sel-pulse {
          position: absolute;
          inset: -2px;
          border-radius: 8px;
          border: 2px solid var(--brand, #306FF6);
          opacity: 0;
          animation: kb-sel-pulse 1.5s ease-out infinite;
          pointer-events: none;
        }
        .kb-sel-settings {
          color: #007aff;
        }
        @keyframes kb-sel-pulse {
          0% {
            opacity: 0.9;
            transform: scale(0.98);
          }
          70% {
            opacity: 0;
            transform: scale(1.04);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------- Overlays ---------------------------

function FaceIdOverlay({clientName, onTap}: {clientName: string; onTap: () => void}) {
  return (
    <button
      type="button"
      className="kbw-fid"
      onClick={onTap}
      aria-label="Continue"
    >
      <span className="kbw-fid-icon">
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 18V12a4 4 0 014-4h6M46 8h6a4 4 0 014 4v6M8 46v6a4 4 0 004 4h6M46 56h6a4 4 0 004-4v-6" />
          <line x1="22" y1="24" x2="22" y2="30" />
          <line x1="42" y1="24" x2="42" y2="30" />
          <path d="M32 26v10l-3 2" />
          <path d="M22 42c2.5 2 6 3 10 3s7.5-1 10-3" />
        </svg>
      </span>
      <span className="kbw-fid-title">Face ID</span>
      <span className="kbw-fid-sub">Iniciando sesión en {clientName}</span>
      <style jsx>{`
        .kbw-fid {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.74);
          backdrop-filter: blur(22px);
          border: 0;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 24px;
          cursor: pointer;
          z-index: 10;
          animation: kbw-fade 0.25s ease-out;
        }
        .kbw-fid-icon :global(svg) {
          width: 64px;
          height: 64px;
          color: #fff;
          animation: kbw-scan 1.6s ease-in-out infinite;
        }
        .kbw-fid-title {
          font: 600 17px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
        }
        .kbw-fid-sub {
          font: 400 13px/1.35
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
        @keyframes kbw-scan {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes kbw-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </button>
  );
}

function LoaderOverlay({brand, onTap}: {brand: string; onTap: () => void}) {
  const {t} = useI18n();
  return (
    <button
      type="button"
      className="kbw-load"
      onClick={onTap}
      aria-label="Continue"
    >
      <span
        className="kbw-load-spin"
        style={{borderTopColor: brand}}
        aria-hidden
      />
      <span className="kbw-load-title">{t('kbw_loader_title')}</span>
      <span className="kbw-load-sub">{t('kbw_loader_sub')}</span>
      <style jsx>{`
        .kbw-load {
          position: absolute;
          inset: 0;
          background: rgba(8, 12, 24, 0.85);
          backdrop-filter: blur(20px);
          border: 0;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 24px;
          cursor: pointer;
          z-index: 10;
          animation: kbw-fade 0.2s ease-out;
        }
        .kbw-load-spin {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.16);
          border-top-color: #fff;
          animation: kbw-spin 0.9s linear infinite;
        }
        .kbw-load-title {
          font: 600 14px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
        }
        .kbw-load-sub {
          font: 400 11px/1.4
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.65);
          text-align: center;
        }
        @keyframes kbw-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kbw-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </button>
  );
}
