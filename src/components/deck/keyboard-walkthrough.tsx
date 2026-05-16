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
        <ChatPanel step={step} chromeLabel={chromeLabel} brand={brand} />
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
          gap: 0;
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

// --------------------------- Chat panel ---------------------------
// Mock WhatsApp screen: fixed header (avatar + contact name + WhatsApp
// label) and a conversation body with bubbles that auto-animate in on
// step 0 (typing → msg1 → typing → msg2). Tinted chat background so
// the bubbles read as bubbles and don't blend into the slide.

type ChatStage = 'typing1' | 'msg1' | 'typing2' | 'msg2';

function ChatPanel({
  step,
  chromeLabel,
  brand
}: {
  step: StepId;
  chromeLabel: string;
  brand: string;
}) {
  const {t} = useI18n();
  const [chatStage, setChatStage] = useState<ChatStage>(
    step === 0 ? 'typing1' : 'msg2'
  );

  // Auto-play the typing sequence whenever we land on step 0 (initial
  // mount, backward nav, or restart). Other steps jump to the final
  // state so both bubbles are always there as context.
  useEffect(() => {
    if (step !== 0) {
      setChatStage('msg2');
      return;
    }
    setChatStage('typing1');
    const t1 = window.setTimeout(() => setChatStage('msg1'), 1100);
    const t2 = window.setTimeout(() => setChatStage('typing2'), 1900);
    const t3 = window.setTimeout(() => setChatStage('msg2'), 3300);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [step]);

  const showMsg1 =
    chatStage === 'msg1' || chatStage === 'typing2' || chatStage === 'msg2';
  const showMsg2 = chatStage === 'msg2';
  const showTyping = chatStage === 'typing1' || chatStage === 'typing2';
  const linkSent = step === 6;

  return (
    <div className="kbw-chat" aria-hidden>
      <div className="kbw-chat-header">
        <span className="kbw-chat-avatar" aria-hidden>
          M
        </span>
        <div className="kbw-chat-id">
          <span className="kbw-chat-name">{t('kbw_chat_contact')}</span>
          <span className="kbw-chat-app">
            <span className="kbw-chat-app-dot" aria-hidden />
            WhatsApp
          </span>
        </div>
      </div>
      <div className={`kbw-chat-body ${linkSent ? 'has-link' : ''}`}>
        {showMsg1 && (
          <div key="msg1" className="kbw-bubble in kbw-anim-in">
            {t('kbw_chat_msg1')}
          </div>
        )}
        {showTyping && (
          <div key="typing" className="kbw-typing kbw-anim-in" aria-label="typing">
            <span />
            <span />
            <span />
          </div>
        )}
        {showMsg2 && (
          <div key="msg2" className="kbw-bubble in kbw-anim-in">
            {t('kbw_chat_msg2')}
          </div>
        )}
        {linkSent && (
          <div className="kbw-bubble out kbw-bubble-link">
            <span className="kbw-link-icon" style={{background: brand}}>
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
      </div>
      <style jsx>{`
        .kbw-chat {
          background: #ECE5DD;
          border-radius: 22px 22px 0 0;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.06);
        }
        .kbw-chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: #fff;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }
        .kbw-chat-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ef4444);
          color: #fff;
          font: 700 14px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kbw-chat-id {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }
        .kbw-chat-name {
          font: 600 13px/1.15
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
        }
        .kbw-chat-app {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font: 500 10px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #25D366;
        }
        .kbw-chat-app-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #25D366;
        }
        .kbw-chat-body {
          padding: 10px 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-start;
          min-height: 110px;
          background-image: radial-gradient(
              rgba(0, 0, 0, 0.025) 1px,
              transparent 1px
            );
          background-size: 18px 18px;
        }
        .kbw-bubble {
          padding: 7px 11px 6px;
          border-radius: 9px;
          font: 400 12.5px/1.35
            -apple-system, 'SF Pro', system-ui, sans-serif;
          max-width: 80%;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
        }
        .kbw-bubble.in {
          background: #fff;
          color: #111;
          border-top-left-radius: 0;
        }
        .kbw-bubble.out {
          align-self: flex-end;
          background: #DCF8C6;
          color: #111;
          border-top-right-radius: 0;
        }
        /* Each bubble / typing element pops in when it mounts. The
           sequence is driven by chatStage transitions in JS, not by
           CSS delays — keys force a fresh mount so the animation
           re-runs every time. */
        .kbw-anim-in {
          animation: kbw-bubble-in 0.3s cubic-bezier(0.16, 0.84, 0.32, 1.16)
            both;
        }
        .kbw-bubble-link {
          padding: 8px 10px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .kbw-link-icon {
          width: 30px;
          height: 30px;
          border-radius: 7px;
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
          font: 600 12.5px/1.1
            -apple-system, 'SF Pro', system-ui, sans-serif;
        }
        .kbw-link-sub {
          font-size: 9.5px;
          color: rgba(0, 0, 0, 0.55);
        }
        /* WhatsApp-style typing indicator — three dots inside a bubble */
        .kbw-typing {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 9px 11px;
          background: #fff;
          border-radius: 9px;
          border-top-left-radius: 0;
          box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
          animation: kbw-bubble-in 0.3s ease-out forwards;
        }
        .kbw-typing span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          animation: kbw-typing-bounce 1.2s infinite ease-in-out;
        }
        .kbw-typing span:nth-child(2) {
          animation-delay: 0.18s;
        }
        .kbw-typing span:nth-child(3) {
          animation-delay: 0.36s;
        }
        @keyframes kbw-bubble-in {
          0% {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes kbw-typing-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.35;
          }
          30% {
            transform: translateY(-3px);
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
  // Pasos 0, 1: QWERTY (paso 1 le pone un selector flotando arriba).
  // Pasos 2, 3: magic keyboard normal con tap targets.
  // Pasos 4–6: magic keyboard congelado mostrando estado adentro (login
  //   → loader → success). El paso 4 añade un modal Face ID flotando
  //   ENCIMA del teclado (no lo reemplaza).
  const showQwerty = step === 0 || step === 1;
  const showMagic = step >= 2;
  const magicAmount = step === 2 ? '0' : '50';
  const magicStatus: 'idle' | 'login' | 'loading' | 'success' =
    step === 4 ? 'login' : step === 5 ? 'loading' : step === 6 ? 'success' : 'idle';

  return (
    <div className="kbw-surface" style={{['--brand' as string]: brand}}>
      <InputBar />

      {showQwerty && (
        <Qwerty
          onTapGlobe={step === 0 ? onAdvance : undefined}
          pulseGlobe={step === 0}
        />
      )}

      {showMagic && (
        <div className="kbw-magic-wrap">
          <MagicKeyboard
            amount={magicAmount}
            color={brand}
            showImessageBar={false}
            recipientName={senderLabel}
            keysSlot={
              magicStatus === 'idle' ? undefined : (
                <MagicSlotStatus
                  status={magicStatus}
                  clientName={clientName}
                  brand={brand}
                  onTap={onAdvance}
                />
              )
            }
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

      {/* Selector flota ENCIMA del QWERTY, anclado al globo, como iOS */}
      {step === 1 && (
        <KeyboardSelector chromeLabel={chromeLabel} onSelect={onAdvance} />
      )}

      {/* Face ID es un modal SOBRE el teclado magic — el teclado queda
          visible debajo en modo loading. */}
      {step === 4 && <FaceIdModal clientName={clientName} onTap={onAdvance} />}

      <style jsx>{`
        .kbw-surface {
          position: relative;
          background: #fff;
          border-radius: 0 0 22px 22px;
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

function InputBar() {
  return (
    <div className="kbw-input" aria-hidden>
      <span className="kbw-input-plus">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>
      <span className="kbw-input-field">Message</span>
      <svg className="kbw-input-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="9" y="3" width="6" height="13" rx="3" />
        <path d="M19 11v1a7 7 0 01-14 0v-1" />
        <line x1="12" y1="20" x2="12" y2="23" />
      </svg>
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
// iOS-style picker that pops up from the globe of the QWERTY. Floats
// OVER the keyboard — does not replace it — anchored to the bottom-left
// where the globe sits, mimicking iOS's long-press menu.

function KeyboardSelector({
  chromeLabel,
  onSelect
}: {
  chromeLabel: string;
  onSelect: () => void;
}) {
  return (
    <div className="kb-sel-anchor" aria-hidden>
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
      <span className="kb-sel-tail" aria-hidden />
      <style jsx>{`
        .kb-sel-anchor {
          position: absolute;
          left: 12px;
          bottom: 50px;
          z-index: 8;
          animation: kb-sel-in 0.22s ease-out;
        }
        .kb-sel {
          width: 230px;
          background: rgba(255, 255, 255, 0.97);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.22),
            0 2px 6px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(20px);
        }
        .kb-sel-row {
          padding: 9px 12px;
          font: 400 12.5px/1.1
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
          padding: 10px 12px;
          color: #111;
          font: 600 12.5px/1.15
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
          width: 22px;
          height: 22px;
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
        /* Little tail pointing down at the globe button so it reads as
           "popped from there" instead of floating randomly. */
        .kb-sel-tail {
          position: absolute;
          left: 14px;
          bottom: -6px;
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.97);
          transform: rotate(45deg);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.06);
        }
        @keyframes kb-sel-in {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
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

// --------------------------- Magic keys slot ---------------------------
// Content for the MagicKeyboard's `keysSlot` — replaces the numeric keys
// grid + Send button while the keyboard itself keeps its toolbar and
// globe/mic row visible. The slot reserves the exact same height as the
// keys + Send (167px) so the keyboard stays the same size. Three
// variants:
//   - login   → spinner + "Iniciando sesión en {client}"  (step 4)
//   - loading → spinner + "Generando liga de pago…"        (step 5)
//   - success → animated check + "Liga generada"           (step 6)

function MagicSlotStatus({
  status,
  clientName,
  brand,
  onTap
}: {
  status: 'login' | 'loading' | 'success';
  clientName: string;
  brand: string;
  onTap: () => void;
}) {
  const {t} = useI18n();
  const isSuccess = status === 'success';
  const isLogin = status === 'login';
  const title = isSuccess
    ? t('kbw_success_title')
    : isLogin
      ? t('kbw_login_title').replace('{client}', clientName)
      : t('kbw_loader_title');
  const sub = isSuccess
    ? null
    : isLogin
      ? t('kbw_login_sub')
      : t('kbw_loader_sub');

  return (
    <button
      type="button"
      className={`kbw-slot ${status}`}
      onClick={onTap}
      aria-label="Continue"
    >
      <span className="kbw-slot-icon">
        {isSuccess ? (
          <span className="kbw-check" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="11" fill="#22C55E" />
              <path
                d="M7 12.5l3.5 3.5L17 9"
                stroke="#fff"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span
            className="kbw-spin"
            style={{
              borderTopColor: brand,
              borderRightColor: brand
            }}
            aria-hidden
          />
        )}
      </span>
      <span className="kbw-slot-text">
        <span className="kbw-slot-title">{title}</span>
        {sub && <span className="kbw-slot-sub">{sub}</span>}
      </span>
      <style jsx>{`
        .kbw-slot {
          width: 100%;
          height: 100%;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          padding: 16px 18px;
          cursor: pointer;
          animation: kbw-slot-in 0.28s ease-out;
        }
        .kbw-slot.success {
          background: color-mix(in srgb, #22C55E 7%, #fff);
          border-color: color-mix(in srgb, #22C55E 24%, transparent);
          animation: kbw-slot-in 0.28s ease-out,
            kbw-slot-success-glow 0.7s ease-out 0.1s;
        }
        .kbw-slot-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .kbw-spin {
          display: block;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid rgba(0, 0, 0, 0.1);
          /* borderTopColor + borderRightColor inlined to use brand */
          animation: kbw-spin 0.85s linear infinite;
        }
        .kbw-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          animation: kbw-check-pop 0.42s cubic-bezier(0.18, 0.84, 0.32, 1.34);
        }
        .kbw-check :global(svg) {
          width: 100%;
          height: 100%;
        }
        .kbw-slot-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        .kbw-slot-title {
          font: 600 13px/1.25
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: #111;
        }
        .kbw-slot-sub {
          font: 400 11px/1.4
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(0, 0, 0, 0.55);
        }
        @keyframes kbw-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes kbw-slot-in {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes kbw-check-pop {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes kbw-slot-success-glow {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          100% {
            box-shadow: 0 0 0 16px rgba(34, 197, 94, 0);
          }
        }
      `}</style>
    </button>
  );
}

// --------------------------- Face ID modal ---------------------------
// Floats centered over the magic keyboard. Does NOT cover the chat
// above and only dims the keyboard underneath — that keyboard is in its
// "Iniciando sesión" loading state and stays visible.

function FaceIdModal({clientName, onTap}: {clientName: string; onTap: () => void}) {
  return (
    <div className="kbw-fid-wrap" onClick={onTap} role="presentation">
      <span className="kbw-fid-scrim" aria-hidden />
      <button
        type="button"
        className="kbw-fid-card"
        onClick={onTap}
        aria-label="Continue"
      >
        <span className="kbw-fid-icon">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M8 18V12a4 4 0 014-4h6M46 8h6a4 4 0 014 4v6M8 46v6a4 4 0 004 4h6M46 56h6a4 4 0 004-4v-6" />
            <line x1="22" y1="24" x2="22" y2="30" />
            <line x1="42" y1="24" x2="42" y2="30" />
            <path d="M32 26v10l-3 2" />
            <path d="M22 42c2.5 2 6 3 10 3s7.5-1 10-3" />
          </svg>
        </span>
        <span className="kbw-fid-title">Face ID</span>
        <span className="kbw-fid-sub">Iniciando sesión en {clientName}</span>
      </button>
      <style jsx>{`
        .kbw-fid-wrap {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          animation: kbw-fade 0.22s ease-out;
        }
        .kbw-fid-scrim {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.42);
          backdrop-filter: blur(2px);
        }
        .kbw-fid-card {
          position: relative;
          width: 220px;
          background: rgba(20, 22, 28, 0.96);
          border-radius: 18px;
          border: 0;
          padding: 18px 16px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          animation: kbw-fid-pop 0.28s cubic-bezier(0.16, 0.84, 0.32, 1.16);
        }
        .kbw-fid-icon :global(svg) {
          width: 44px;
          height: 44px;
          color: #fff;
          animation: kbw-fid-scan 1.6s ease-in-out infinite;
        }
        .kbw-fid-title {
          font: 600 14px/1
            -apple-system, 'SF Pro', system-ui, sans-serif;
        }
        .kbw-fid-sub {
          font: 400 11px/1.35
            -apple-system, 'SF Pro', system-ui, sans-serif;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
        }
        @keyframes kbw-fid-pop {
          0% {
            opacity: 0;
            transform: scale(0.86);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes kbw-fid-scan {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes kbw-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
