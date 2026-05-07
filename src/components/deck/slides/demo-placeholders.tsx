'use client';

// Phase-3 placeholders — interactive demos go here in the next pass.
// Slide 08 (keyboard) and slide 12 (voice) currently show MP4 videos in iPhone frame
// with a replay button. Slide 11 (tap) shows a static image until the user provides video.
// Slide 13 (white-label) is a live customizer matching mgic.me/docs#customization.

import {useState} from 'react';
import {useI18n} from '../i18n-context';
import {VideoPhone} from '../video-phone';
import {MagicKeyboard} from '../magic-keyboard';
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
          padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 5vw, 80px);
          align-items: center;
          height: 100%;
          min-height: 0;
        }
        .demo-left {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 0;
        }
        .demo-right {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 0;
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
      `}</style>
    </div>
  );
}

// 08 Keyboard demo — autoplay video w/ replay
export const KeyboardDemoSlide: SlideDef = {
  id: 'keyboard-demo',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <DemoShell
        label={t('kb_label')}
        kicker={t('kb_kicker')}
        title={t('kb_title')}
        caption={t('kb_explanation')}
        right={<VideoPhone src="/deck/videos/keyboard.mp4" />}
      />
    );
  }
};

// 10 Claim demo — interactive flow inside iPhone frame.
// Toggle "1ra vez" (full form, type CLABE + name) vs "2da vez" (saved account).
// CLABE/Tarjeta vs DIMO (próximamente). Brand color from client config.
export const ClaimDemoSlide: SlideDef = {
  id: 'claim-demo',
  variant: 'light',
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    return (
      <DemoShell
        label={t('claim_label')}
        kicker={t('claim_kicker')}
        title={t('claim_title')}
        right={<ClaimDemo brand={client.brand_color ?? '#306FF6'} />}
      />
    );
  }
};

// 11 Tap demo — drop tap.jpg into /public/deck/images/ to show the two-phone shot.
// Falls back to a placeholder phone until the file is added.
export const TapDemoSlide: SlideDef = {
  id: 'tap-demo',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <DemoShell
        label={t('tap_label')}
        kicker={t('tap_kicker')}
        title={t('tap_title')}
        caption={t('tap_caption')}
        right={<TapImageOrPlaceholder />}
        badge="Video coming"
      />
    );
  }
};

function TapImageOrPlaceholder() {
  return (
    <div className="tap-img-wrap">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/deck/images/tap.png"
        alt="Two phones tapping to share a payment link via NFC"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
      <style jsx>{`
        .tap-img-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tap-img-wrap :global(img) {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}

// 12 Voice demo — autoplay video w/ replay
export const VoiceDemoSlide: SlideDef = {
  id: 'voice-demo',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <DemoShell
        label={t('voice_label')}
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
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    return (
      <div className="wl-frame">
        <div className="wl-head">
          <p className="deck-eyebrow">{t('wl_label')}</p>
          <p className="deck-kicker">{t('wl_kicker')}</p>
          <h1 className="wl-title">{t('wl_title')}</h1>
          <p className="wl-caption">{t('wl_caption')}</p>
        </div>
        <Customizer initialColor={client.brand_color ?? '#306FF6'} />
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
        `}</style>
      </div>
    );
  }
};

const PRESETS = [
  '#306FF6', '#1A1A2E', '#2C8A3E', '#F5C842', '#000000', '#1F3A52', '#2D5DEB', '#4F8C5A', '#D6383D', '#0E2A4D',
  '#5C2DD5', '#3DA5D9', '#E5651E', '#7BC97D', '#A8262A', '#1A1A1A', '#2F6E3F', '#4FA3D9', '#C2358F', '#7A1FA8',
  '#0A2855', '#E58FA5', '#1B3252', '#0F1F33', '#C42026', '#A24A4A', '#3D6AE8', '#7BCFAE', '#F5D04E', '#A8DC72'
];

function Customizer({initialColor}: {initialColor: string}) {
  const [primary, setPrimary] = useState(initialColor);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="cust">
      <div className="cust-panel">
        <div className="cust-section">
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
        <div className="preview-stage">
          <div className={`preview-chat ${theme}`}>
            <div className="preview-header">
              <span className="preview-plus">+</span>
              <div className="preview-input">Message…</div>
              <span className="preview-mic">🎤</span>
            </div>
            <div className="preview-meta">
              <span>Jonathan Moore</span>
              <span className="muted">Main Account</span>
            </div>
            <MagicKeyboard amount="320" color={primary} theme={theme} size="md" />
          </div>
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
        }
        .preview-chat {
          width: 100%;
          max-width: 380px;
          background: var(--mp-grey);
          border-radius: 18px;
          padding: 12px 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border: 1px solid var(--mp-border-soft);
        }
        .preview-chat.dark {
          background: #14141a;
          border-color: rgba(255, 255, 255, 0.05);
        }
        .preview-header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 8px;
          align-items: center;
          background: var(--mp-white);
          border-radius: 999px;
          padding: 6px 10px;
        }
        .dark .preview-header {
          background: #1f1f26;
        }
        .preview-plus {
          color: var(--mp-fg-muted);
          font-size: 16px;
        }
        .preview-input {
          color: var(--mp-fg-muted);
          font: 400 13px/1 var(--mp-font-ios);
        }
        .preview-mic {
          font-size: 14px;
          opacity: 0.6;
        }
        .preview-meta {
          display: flex;
          justify-content: space-between;
          padding: 0 6px;
          font: 500 11px/1 var(--mp-font-ios);
          color: var(--mp-fg);
        }
        .dark .preview-meta {
          color: #fff;
        }
        .preview-meta .muted {
          color: var(--mp-fg-muted);
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
