'use client';

// Phase-3 placeholders — interactive demos go here in the next pass.
// Slide 08 (keyboard) and slide 12 (voice) currently show MP4 videos in iPhone frame
// with a replay button. Slide 11 (tap) shows a static image until the user provides video.
// Slide 13 (white-label) is a live customizer matching mgic.me/docs#customization.

import {useState} from 'react';
import {useI18n} from '../i18n-context';
import {eyebrow} from '@/lib/deck/eyebrow';
import {VideoPhone} from '../video-phone';
import {MagicKeyboard} from '../magic-keyboard';
import {KeyboardWalkthrough} from '../keyboard-walkthrough';
import {ClaimDemo} from '../claim-demo';
import type {SlideContext, SlideDef} from '../deck-shell';

function PhonePlaceholder({label}: {label: string}) {
  return (
    <div className="ph-wrap">
      <div className="deck-phone">
        <div className="deck-phone-notch" />
        <div className="deck-phone-screen">
          <div className="ph-content">
            <span className="ph-dot" />
            <span className="ph-label">{label}</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .ph-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ph-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: var(--mp-fg-muted);
        }
        .ph-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--brand);
          animation: pulse 1.6s var(--mp-ease) infinite;
        }
        .ph-label {
          font: 500 13px/1 var(--mp-font-body);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function DemoShell({
  label,
  kicker,
  title,
  caption,
  right,
  badge
}: {
  label: string;
  kicker: string;
  title: string;
  caption?: string;
  right: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="demo-frame">
      <div className="demo-left">
        <p className="deck-eyebrow">{label}</p>
        <p className="deck-kicker">{kicker}</p>
        <h1 className="deck-title-1">{title}</h1>
        {caption && <p className="deck-lede">{caption}</p>}
        {badge && (
          <div className="demo-coming">
            <span className="dot" /> {badge}
          </div>
        )}
      </div>
      <div className="demo-right">{right}</div>
      <style jsx>{`
        .demo-frame {
          padding: clamp(32px, 4vh, 64px) var(--pad-x) clamp(28px, 3.5vh, 56px);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: start;
          height: 100%;
          min-height: 0;
        }
        .demo-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
          padding-top: clamp(16px, 3vh, 40px);
        }
        .demo-right {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
          min-height: 0;
        }
        .demo-right :global(.deck-phone) {
          max-height: 88%;
        }
        .demo-coming {
          margin-top: 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: var(--mp-grey);
          border-radius: var(--mp-radius-pill);
          font: 500 13px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          width: fit-content;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand);
        }
        @media (max-width: 900px) {
          .demo-frame {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 640px) {
          .demo-frame {
            padding: 20px 18px 28px;
            gap: 18px;
            height: auto;
          }
          .demo-left {
            padding-top: 0;
            gap: 8px;
          }
          .demo-left :global(.deck-kicker) {
            font-size: 16px;
            margin-bottom: 2px;
          }
          .demo-left :global(.deck-title-1) {
            font-size: clamp(22px, 6.5vw, 28px);
            line-height: 1.18;
          }
          .demo-left :global(.deck-lede) {
            font-size: 14px;
            line-height: 1.45;
          }
          .demo-right {
            height: auto;
          }
          .demo-right :global(.deck-phone) {
            max-height: none;
          }
          .demo-coming {
            font-size: 12px;
            padding: 6px 12px;
            margin-top: 6px;
          }
        }
      `}</style>
    </div>
  );
}

// 08 Keyboard demo — autoplay video w/ replay. Title and caption replace {client}
// with the bank's name so it reads as the bank's own keyboard. For regulator
// decks we swap to *_regulator variants that read "del banco" with correct
// grammar (no {client} interpolation needed).
export const KeyboardDemoSlide: SlideDef = {
  id: 'keyboard-demo',
  variant: 'light',
  Body: ({client, index, visitorName}: SlideContext) => {
    const {t} = useI18n();
    const isRegulator = client.kind === 'regulator';
    const fillClient = (s: string) => s.replaceAll('{client}', client.name);
    const chromeLabel = client.display_name ?? client.name;
    const brand = client.brand_color ?? '#306FF6';
    return (
      <div className="kb-frame">
        <div className="kb-left">
          <p className="deck-eyebrow">{eyebrow(index, t('kb_label'))}</p>
          <p className="deck-kicker">{t('kb_kicker')}</p>
          <h1 className="deck-title-1">
            {isRegulator ? t('kb_title_regulator') : fillClient(t('kb_title'))}
          </h1>
          <p className="deck-lede">
            {isRegulator
              ? t('kb_explanation_regulator')
              : fillClient(t('kb_explanation'))}
          </p>
        </div>
        <div className="kb-right">
          <KeyboardWalkthrough
            clientName={client.name}
            chromeLabel={chromeLabel}
            visitorName={visitorName}
            brand={brand}
          />
        </div>
        <style jsx>{`
          .kb-frame {
            padding: clamp(28px, 3.5vh, 56px) var(--pad-x) clamp(20px, 2.5vh, 36px);
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
            gap: clamp(32px, 4vw, 64px);
            align-items: start;
            height: 100%;
            min-height: 0;
          }
          .kb-left {
            display: flex;
            flex-direction: column;
            gap: 14px;
            min-width: 0;
            padding-top: clamp(16px, 3vh, 40px);
          }
          .kb-right {
            display: flex;
            align-items: stretch;
            justify-content: center;
            height: 100%;
            min-height: 0;
          }
          @media (max-width: 900px) {
            .kb-frame {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 640px) {
            .kb-frame {
              padding: 20px 18px 28px;
              gap: 18px;
              height: auto;
            }
            .kb-left {
              padding-top: 0;
              gap: 8px;
            }
            .kb-left :global(.deck-kicker) {
              font-size: 16px;
              margin-bottom: 2px;
            }
            .kb-left :global(.deck-title-1) {
              font-size: clamp(22px, 6.5vw, 28px);
              line-height: 1.18;
            }
            .kb-left :global(.deck-lede) {
              font-size: 14px;
              line-height: 1.45;
            }
            .kb-right {
              height: auto;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 10 Claim demo — interactive flow inside iPhone frame.
// Auto-fills CLABE → name → switches to DIMO → fills phone → CODI lookup → auto-claim.
// Two info callouts on the left explain browser-saved + acquisition channel benefits.
export const ClaimDemoSlide: SlideDef = {
  id: 'claim-demo',
  variant: 'light',
  Body: ({client, index}: SlideContext) => {
    const {t} = useI18n();
    return (
      <div className="claim-frame">
        <div className="claim-left">
          <div className="claim-head">
            <p className="deck-eyebrow">{eyebrow(index, t('claim_label'))}</p>
            <p className="deck-kicker">{t('claim_kicker')}</p>
            <h1 className="claim-title">{t('claim_title')}</h1>
          </div>
          <div className="claim-info">
            <ClaimInfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                  <path d="M12 16v2" />
                </svg>
              }
              title={t('claim_info_saved_title')}
              desc={t('claim_info_saved_desc')}
            />
            <ClaimInfoCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l18-8-3 18-7-6-3 6-1-7-4-3z" />
                </svg>
              }
              title={t('claim_info_acq_title')}
              desc={t('claim_info_acq_desc')}
            />
          </div>
        </div>
        <div className="claim-right">
          <ClaimDemo
            brand={client.brand_color ?? '#306FF6'}
            clientName={client.name}
            clientLogo={client.logo_url ?? undefined}
            clientAppIcon={client.app_icon_url ?? undefined}
          />
        </div>
        <style jsx>{`
          .claim-frame {
            padding: clamp(28px, 3.5vh, 56px) var(--pad-x) clamp(20px, 2.5vh, 36px);
            display: grid;
            grid-template-columns: 1.05fr 1fr;
            gap: clamp(32px, 4vw, 64px);
            align-items: center;
            height: 100%;
            min-height: 0;
          }
          .claim-left {
            display: flex;
            flex-direction: column;
            gap: clamp(20px, 2.6vh, 32px);
            min-width: 0;
          }
          .claim-head {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .claim-title {
            font: 500 clamp(28px, 3.4vw, 48px) / 1.05 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 4px 0 0;
            color: var(--mp-ink);
          }
          .claim-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .claim-right {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            min-height: 0;
          }
          @media (max-width: 900px) {
            .claim-frame {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 640px) {
            .claim-frame {
              padding: 18px 18px 28px;
              gap: 16px;
              height: auto;
            }
            .claim-left {
              gap: 14px;
            }
            .claim-head :global(.deck-kicker) {
              font-size: 16px;
              margin-bottom: 2px;
            }
            .claim-title {
              font-size: clamp(22px, 6.5vw, 28px);
            }
            .claim-info {
              gap: 8px;
            }
            .claim-right {
              height: auto;
              min-height: 0;
            }
            .claim-right :global(.claim-stage) {
              transform: scale(0.85);
              transform-origin: top center;
              margin: 0 auto -40px;
            }
          }
        `}</style>
      </div>
    );
  }
};

function ClaimInfoCard({icon, title, desc}: {icon: React.ReactNode; title: string; desc: string}) {
  return (
    <div className="ic">
      <span className="ic-icon" style={{color: 'var(--brand)'}}>
        {icon}
      </span>
      <div className="ic-text">
        <h3 className="ic-title">{title}</h3>
        <p className="ic-desc">{desc}</p>
      </div>
      <style jsx>{`
        .ic {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 14px;
          padding: 14px 16px;
          background: var(--mp-grey);
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-lg);
          align-items: flex-start;
        }
        .ic-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: color-mix(in srgb, var(--brand) 12%, var(--mp-white));
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ic-icon :global(svg) {
          width: 18px;
          height: 18px;
        }
        .ic-title {
          font: 500 clamp(14px, 1.2vw, 17px) / 1.2 var(--mp-font-display);
          color: var(--mp-ink);
          margin: 0 0 4px;
        }
        .ic-desc {
          font: 400 clamp(12px, 1vw, 14px) / 1.45 var(--mp-font-body);
          color: var(--mp-fg-muted);
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// 11 Tap demo — full-bleed video background with text overlay.
export const TapDemoSlide: SlideDef = {
  id: 'tap-demo',
  variant: 'dark',
  bare: true,
  Body: ({index}) => {
    const {t} = useI18n();
    return (
      <div className="tap-frame">
        <video
          className="tap-video"
          src="/deck/videos/tap.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
        <div className="tap-scrim" aria-hidden />
        <div className="tap-content">
          <p className="deck-eyebrow tap-eyebrow">{eyebrow(index, t('tap_label'))}</p>
          <p className="deck-kicker tap-kicker">{t('tap_kicker')}</p>
          <h1 className="tap-title">{t('tap_title')}</h1>
          <p className="tap-caption">{t('tap_caption')}</p>
        </div>
        <style jsx global>{`
          [data-slide-id='tap-demo'] {
            padding: 0 !important;
          }
        `}</style>
        <style jsx>{`
          .tap-frame {
            position: absolute;
            inset: 0;
            overflow: hidden;
            background: #000;
          }
          .tap-video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .tap-scrim {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.7) 0%,
              rgba(0, 0, 0, 0.45) 45%,
              rgba(0, 0, 0, 0.15) 80%,
              rgba(0, 0, 0, 0) 100%
            );
            pointer-events: none;
          }
          .tap-content {
            position: relative;
            height: 100%;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: 720px;
            color: #fff;
          }
          .tap-eyebrow {
            color: rgba(255, 255, 255, 0.7);
          }
          .tap-kicker {
            color: var(--brand);
            margin: 0;
          }
          .tap-title {
            font: 500 clamp(40px, 5.5vw, 80px) / 1.05 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 12px 0 18px;
            color: #fff;
          }
          .tap-caption {
            font: 400 clamp(16px, 1.4vw, 22px) / 1.5 var(--mp-font-body);
            color: rgba(255, 255, 255, 0.85);
            margin: 0;
            max-width: 580px;
          }
          @media (max-width: 640px) {
            /* Fit by WIDTH on portrait phones. The pre-rotation box is
               landscape (100dvh × 100dvw) and we use object-fit:contain so
               the video preserves its aspect — the horizontal letterbox of
               the pre-rotation box becomes top/bottom black bars after the
               90° rotation. That gives the user a full-width video with the
               action centered, and small bands above/below instead of the
               cover-style horizontal cropping that ate the corners. */
            .tap-video {
              top: 50%;
              right: auto;
              bottom: auto;
              left: 50%;
              width: 100dvh;
              height: 100dvw;
              max-width: none;
              object-fit: contain;
              transform: translate(-50%, -50%) rotate(-90deg);
              transform-origin: center center;
            }
            /* The horizontal scrim made sense for left-aligned desktop copy.
               Mobile text sits centered/top, so a vertical scrim reads better. */
            .tap-scrim {
              background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0.72) 0%,
                rgba(0, 0, 0, 0.45) 35%,
                rgba(0, 0, 0, 0.15) 70%,
                rgba(0, 0, 0, 0.55) 100%
              );
            }
            .tap-content {
              padding: 18px 18px 28px;
              justify-content: flex-end;
              max-width: none;
            }
            .tap-title {
              font-size: clamp(28px, 8vw, 40px);
              margin: 8px 0 10px;
            }
            .tap-caption {
              font-size: 14px;
              line-height: 1.45;
              max-width: none;
            }
            .tap-kicker {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 12 Voice demo — autoplay video w/ replay
export const VoiceDemoSlide: SlideDef = {
  id: 'voice-demo',
  variant: 'light',
  Body: ({index}) => {
    const {t} = useI18n();
    return (
      <DemoShell
        label={eyebrow(index, t('voice_label'))}
        kicker={t('voice_kicker')}
        title={t('voice_title')}
        caption={t('voice_try')}
        right={<VideoPhone src="/deck/videos/voice.mp4" />}
      />
    );
  }
};

// 13 White-label — interactive customizer matching mgic.me/docs#customization.
// Light/Dark toggle, primary color presets (30 swatches), live keyboard preview.
// All in one slide (full-bleed) since this needs more horizontal space than DemoShell.
export const WhitelabelSlide: SlideDef = {
  id: 'whitelabel',
  variant: 'grey',
  Body: ({client, index}: SlideContext) => {
    const {t} = useI18n();
    return (
      <div className="wl-frame">
        <div className="wl-head">
          <p className="deck-eyebrow">{eyebrow(index, t('wl_label'))}</p>
          <p className="deck-kicker">{t('wl_kicker')}</p>
          <h1 className="wl-title">{t('wl_title')}</h1>
          <p className="wl-caption">{t('wl_caption')}</p>
        </div>
        <Customizer
          initialColor={client.brand_color ?? '#306FF6'}
          clientName={client.name}
        />
        <style jsx>{`
          .wl-frame {
            height: 100%;
            padding: clamp(40px, 5vh, 64px) var(--pad-x) clamp(32px, 4vh, 56px);
            display: flex;
            flex-direction: column;
            gap: clamp(20px, 3vh, 32px);
            min-height: 0;
          }
          .wl-head {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .wl-title {
            font: 500 clamp(36px, 4vw, 56px) / 1.1 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 0;
            color: var(--mp-ink);
          }
          .wl-caption {
            font: 400 clamp(14px, 1.2vw, 18px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
            max-width: 700px;
          }
          @media (max-width: 640px) {
            .wl-frame {
              height: auto;
              padding: 18px 14px 28px;
              gap: 14px;
            }
            .wl-head {
              gap: 4px;
            }
            .wl-head :global(.deck-kicker) {
              font-size: 16px;
              margin-bottom: 2px;
            }
            .wl-title {
              font-size: clamp(22px, 6.5vw, 28px);
            }
            .wl-caption {
              font-size: 13px;
            }
          }
        `}</style>
      </div>
    );
  }
};

// Same presets as mgic.me/docs#customization
const PRESETS = [
  '#306FF6', '#1D1B3A', '#2DB742', '#FFD84D', '#000000', '#143547', '#294AFB', '#00A651', '#EB0029', '#001E96',
  '#4F46E5', '#0097D4', '#FF4B00', '#00C26E', '#DB0011', '#1C1C1C', '#3DAE48', '#009EE3', '#D81B8A', '#830AD1',
  '#003087', '#FF4C5E', '#1E365B', '#242424', '#EA1D25', '#D8322A', '#2B6BE4', '#5FCE87', '#FFE04B', '#B6F687'
];

function Customizer({
  initialColor,
  clientName
}: {
  initialColor: string;
  clientName: string;
}) {
  const [primary, setPrimary] = useState(initialColor);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="cust">
      <div className="cust-panel">
        <div className="cust-section cust-colors">
          <div className="cust-label">COLORES</div>
          <div className="cust-row">
            <span className="cust-tag">LIGHT</span>
            <ColorInput value={primary} onChange={setPrimary} />
            <ColorInput value="#FFFFFF" disabled onChange={() => {}} />
          </div>
          <div className="cust-row">
            <span className="cust-tag">DARK</span>
            <ColorInput value={primary} onChange={setPrimary} />
            <ColorInput value="#FFFFFF" disabled onChange={() => {}} />
          </div>
          <div className="cust-row-meta">
            <span>PRIMARIO</span>
            <span>SOBRE PRIMARIO</span>
          </div>
        </div>
        <div className="cust-section">
          <div className="cust-label">PRESETS</div>
          <div className="cust-presets">
            {PRESETS.map((c) => (
              <button
                key={c}
                className={`preset ${c.toLowerCase() === primary.toLowerCase() ? 'active' : ''}`}
                onClick={() => setPrimary(c)}
                aria-label={`Set color ${c}`}
              >
                <span className="dot" style={{background: c}} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="cust-preview">
        <div className="theme-toggle">
          <button
            className={theme === 'light' ? 'active' : ''}
            onClick={() => setTheme('light')}
          >
            ☀ Light
          </button>
          <button
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => setTheme('dark')}
          >
            ☾ Dark
          </button>
        </div>
        <div className={`preview-stage ${theme}`}>
          <MagicKeyboard
            amount="320"
            color={primary}
            theme={theme}
            recipientName={`${clientName} | Jonathan Moore`}
          />
        </div>
      </div>

      <style jsx>{`
        .cust {
          flex: 1;
          min-height: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 3vw, 40px);
          background: var(--mp-white);
          border-radius: var(--mp-radius-lg);
          padding: clamp(20px, 2.5vw, 32px);
          border: 1px solid var(--mp-border-soft);
        }
        .cust-panel {
          display: flex;
          flex-direction: column;
          gap: clamp(20px, 3vh, 32px);
          min-width: 0;
        }
        .cust-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cust-label {
          font: 500 11px/1 var(--mp-font-body);
          letter-spacing: 0.1em;
          color: var(--mp-fg-muted);
          text-transform: uppercase;
        }
        .cust-row {
          display: grid;
          grid-template-columns: 60px 1fr 1fr;
          gap: 10px;
          align-items: center;
        }
        .cust-tag {
          font: 500 11px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          letter-spacing: 0.06em;
        }
        .cust-row-meta {
          display: grid;
          grid-template-columns: 60px 1fr 1fr;
          gap: 10px;
          font: 500 10px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          letter-spacing: 0.08em;
        }
        .cust-row-meta span:nth-child(1) {
          visibility: hidden;
        }
        .cust-presets {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 8px;
        }
        .preset {
          background: transparent;
          border: 0;
          padding: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .preset .dot {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .preset.active {
          box-shadow: 0 0 0 2px var(--mp-blue);
        }
        .cust-preview {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
          min-height: 0;
        }
        .theme-toggle {
          display: inline-flex;
          align-self: flex-end;
          background: var(--mp-grey);
          border-radius: var(--mp-radius-pill);
          padding: 3px;
          gap: 2px;
        }
        .theme-toggle button {
          background: transparent;
          border: 0;
          padding: 6px 14px;
          border-radius: var(--mp-radius-pill);
          font: 500 12px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          cursor: pointer;
        }
        .theme-toggle button.active {
          background: var(--mp-ink);
          color: #fff;
        }
        .preview-stage {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: var(--mp-neutral-100);
          border-radius: var(--mp-radius-lg);
          transition: background 220ms;
        }
        .preview-stage.dark {
          background: #0a0a0c;
        }
        @media (max-width: 640px) {
          .cust {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 14px;
            border-radius: var(--mp-radius-md);
          }
          .cust-panel {
            gap: 14px;
            order: 2;
          }
          .cust-section {
            gap: 8px;
          }
          /* The hex inputs + LIGHT/DARK rows are too fiddly on a phone;
             keep only the preset swatches. */
          .cust-colors {
            display: none;
          }
          .cust-presets {
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
            justify-items: center;
          }
          /* PDF/mobile mode shows a curated 6-color palette — a longer swatch
             list isn't useful on a 390px screen. */
          .preset:nth-child(n+7) {
            display: none;
          }
          .preset {
            width: 36px;
            height: 36px;
          }
          .preset .dot {
            width: 28px;
            height: 28px;
          }
          .cust-preview {
            order: 1;
            gap: 10px;
          }
          .preview-stage {
            padding: 14px;
            min-height: 320px;
          }
          .preview-stage :global(.kb-preview) {
            transform: scale(0.92);
            transform-origin: top center;
          }
        }
      `}</style>
    </div>
  );
}

function ColorInput({
  value,
  onChange,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="ci">
      <span className="ci-swatch" style={{background: value}} />
      <span className="ci-hash">#</span>
      <input
        type="text"
        value={value.replace('#', '').toUpperCase()}
        onChange={(e) => {
          const v = e.target.value.replace('#', '').slice(0, 6);
          onChange('#' + v);
        }}
        disabled={disabled}
        className="ci-input"
        spellCheck={false}
      />
      <style jsx>{`
        .ci {
          display: grid;
          grid-template-columns: 24px auto 1fr;
          align-items: center;
          gap: 6px;
          background: var(--mp-grey);
          border: 1px solid var(--mp-border-soft);
          border-radius: 8px;
          padding: 6px 10px;
        }
        .ci-swatch {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .ci-hash {
          color: var(--mp-fg-muted);
          font: 500 13px/1 var(--mp-font-body);
        }
        .ci-input {
          background: transparent;
          border: 0;
          font: 500 13px/1 var(--mp-font-body);
          color: var(--mp-ink);
          width: 100%;
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
          outline: none;
        }
        .ci-input:disabled {
          color: var(--mp-fg-muted);
        }
      `}</style>
    </label>
  );
}
