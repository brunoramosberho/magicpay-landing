'use client';

import {useI18n} from '../i18n-context';
import type {SlideContext, SlideDef} from '../deck-shell';

// 18 — Pricing (DB-driven; falls back to "to be defined" if a tier is null)
export const PricingSlide: SlideDef = {
  id: 'pricing',
  variant: 'light',
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    // Kickoff/monthly are big round numbers → no decimals.
    // Per-active-user is typically cents (e.g. $0.50) → always show 2 decimals.
    const fmt = (n: number | null, opts?: {decimals?: number}) =>
      n == null
        ? null
        : new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: client.currency,
            minimumFractionDigits: opts?.decimals ?? 0,
            maximumFractionDigits: opts?.decimals ?? 0
          }).format(n);

    const tiers = [
      {
        ttl: t('price_1_title'),
        desc: t('price_1_desc'),
        value: fmt(client.pricing_kickoff),
        suffix: client.pricing_kickoff != null ? ' · one-time' : ''
      },
      {
        ttl: t('price_2_title'),
        desc: t('price_2_desc'),
        value: fmt(client.pricing_monthly_fixed),
        suffix: client.pricing_monthly_fixed != null ? ' / mo' : ''
      },
      {
        ttl: t('price_3_title'),
        desc: t('price_3_desc'),
        value: fmt(client.pricing_per_active_user, {decimals: 2}),
        suffix:
          client.pricing_per_active_user != null
            ? ` ${client.currency} / MAU`
            : ''
      }
    ];

    const included = [
      t('price_inc_1'),
      t('price_inc_2'),
      t('price_inc_3'),
      t('price_inc_4')
    ];

    return (
      <div className="price-frame">
        <div className="price-head">
          <p className="deck-eyebrow">{t('price_label')}</p>
          <p className="deck-kicker">{t('price_kicker')}</p>
          <h1 className="deck-title-1">{t('price_title')}</h1>
        </div>
        <div className="price-grid">
          {tiers.map((tier, i) => (
            <div className={`price-card ${i === 1 ? 'highlight' : ''}`} key={i}>
              {tier.value && (
                <div className="price-num">
                  <span className="amount" style={{color: 'var(--brand)'}}>
                    {tier.value}
                  </span>
                  {tier.suffix && <span className="suffix">{tier.suffix}</span>}
                </div>
              )}
              <h3>{tier.ttl}</h3>
              <p>{tier.desc}</p>
            </div>
          ))}
        </div>
        <div className="price-included">
          <div className="inc-label">{t('price_inc_title')}</div>
          <ul>
            {included.map((b, i) => (
              <li key={i}>
                <span className="check" style={{background: 'var(--brand)'}}>
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .price-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
          }
          .price-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(16px, 2vw, 24px);
          }
          .price-card {
            padding: clamp(24px, 3vw, 36px);
            background: var(--mp-grey);
            border-radius: var(--mp-radius-lg);
            border: 1px solid var(--mp-border-soft);
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .price-card.highlight {
            background: color-mix(in srgb, var(--brand) 6%, var(--mp-white));
            border-color: color-mix(in srgb, var(--brand) 30%, transparent);
          }
          .price-num {
            display: flex;
            align-items: baseline;
            gap: 6px;
            margin-bottom: 8px;
          }
          .amount {
            font: 500 clamp(36px, 4vw, 56px) / 1 var(--mp-font-display);
            letter-spacing: -0.02em;
          }
          .amount.open {
            color: var(--mp-fg-muted);
            font-size: clamp(20px, 2vw, 28px);
            font-style: italic;
            font-weight: 400;
          }
          .suffix {
            color: var(--mp-fg-muted);
            font: 400 14px/1 var(--mp-font-body);
          }
          .price-card h3 {
            font: 500 clamp(18px, 1.5vw, 22px) / 1.2 var(--mp-font-display);
            margin: 0;
          }
          .price-card p {
            font: 400 clamp(14px, 1.1vw, 16px) / 1.5 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
          }
          .price-included {
            background: var(--mp-grey);
            border-radius: var(--mp-radius-lg);
            padding: clamp(20px, 2.5vw, 32px);
          }
          .inc-label {
            font: 400 clamp(13px, 1vw, 14px) / 1 var(--mp-font-body);
            color: var(--mp-fg-muted);
            text-transform: uppercase;
            letter-spacing: 0.06em;
            margin-bottom: 16px;
          }
          .price-included ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px 24px;
          }
          .price-included li {
            display: flex;
            align-items: center;
            gap: 10px;
            font: 400 clamp(14px, 1.1vw, 16px) / 1.4 var(--mp-font-body);
            color: var(--mp-ink);
          }
          .check {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            color: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: 500 12px/1 var(--mp-font-body);
            flex-shrink: 0;
          }
          @media (max-width: 900px) {
            .price-grid,
            .price-included ul {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 19 — Closing (compact, centered, no excess space)
export const ClosingSlide: SlideDef = {
  id: 'closing',
  variant: 'light',
  bare: true,
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    const appIcon = client.app_icon_url ?? client.logo_url;
    const isRegulator = client.kind === 'regulator';
    return (
      <div className="close-frame">
        <div className="close-glow" aria-hidden />
        <div className="close-content">
          <h1 className="close-thanks">
            {t('close_thanks')}
            {!isRegulator && (
              <>
                <span className="close-comma">,</span>
                <br />
                <span className="close-bank" style={{color: 'var(--brand)'}}>
                  {client.name}
                </span>
              </>
            )}
            <span className="close-period">.</span>
          </h1>
          <p className="close-caption">{t('close_caption')}</p>
          <div className="close-card">
            <div className="contact-row">
              <span className="contact-label">{t('close_name')}</span>
              <a href={`mailto:${t('close_email')}`} className="contact-value">
                {t('close_email')}
              </a>
            </div>
            <div className="contact-row">
              <span className="contact-label">Web</span>
              <a
                href={`https://${t('close_url')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value"
                style={{color: 'var(--brand)'}}
              >
                {t('close_url')}
              </a>
            </div>
          </div>
          {appIcon && (
            <div className="sdk-integration" aria-hidden>
              <div className="si-stack">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={appIcon} alt="" className="si-app" />
                <span className="si-magic-badge">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/deck/logos/icon.svg" alt="" />
                </span>
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .close-frame {
            position: relative;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            overflow: hidden;
          }
          .close-glow {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 70vw;
            height: 70vw;
            background: radial-gradient(
              circle,
              color-mix(in srgb, var(--brand) 14%, transparent) 0%,
              transparent 55%
            );
            pointer-events: none;
          }
          .close-content {
            position: relative;
            text-align: center;
            max-width: 720px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(20px, 3vh, 32px);
          }
          .close-thanks {
            font: 500 clamp(64px, 9vw, 130px) / 0.98 var(--mp-font-display);
            letter-spacing: -0.03em;
            color: var(--mp-ink);
            margin: 0;
          }
          .close-comma,
          .close-period {
            color: var(--mp-fg-muted);
          }
          .close-bank {
            font-style: italic;
          }
          .close-caption {
            font: 400 clamp(18px, 1.6vw, 24px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
            max-width: 540px;
          }
          .close-card {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: clamp(20px, 2.5vw, 28px);
            background: var(--mp-white);
            border: 1px solid var(--mp-border-soft);
            border-radius: var(--mp-radius-lg);
            box-shadow: var(--mp-shadow-sm);
            min-width: 320px;
          }
          .contact-row {
            display: flex;
            justify-content: space-between;
            gap: 24px;
            font: 400 15px/1 var(--mp-font-body);
            padding: 8px 0;
          }
          .contact-label {
            color: var(--mp-fg-muted);
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.06em;
          }
          .contact-value {
            color: var(--mp-ink);
            text-decoration: none;
            font-weight: 500;
          }
          .contact-value:hover {
            text-decoration: underline;
          }
          /* Same SDK-integration stack as slide 07 — app icon with a magic
             badge clipped onto the corner. Reinforces that the relationship
             ends with magic living inside the client's app. */
          .sdk-integration {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: clamp(8px, 1.5vh, 16px);
          }
          .si-stack {
            position: relative;
            width: clamp(72px, 7vw, 104px);
            height: clamp(72px, 7vw, 104px);
          }
          .si-app {
            width: 100%;
            height: 100%;
            border-radius: 28%;
            object-fit: cover;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12),
              0 2px 6px rgba(0, 0, 0, 0.06);
          }
          .si-magic-badge {
            position: absolute;
            right: -8px;
            bottom: -8px;
            width: 38%;
            height: 38%;
            border-radius: 30%;
            background: var(--brand);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px
                color-mix(in srgb, var(--brand) 35%, transparent),
              0 0 0 4px var(--mp-bg);
          }
          .si-magic-badge :global(img) {
            width: 60%;
            height: 60%;
            filter: brightness(0) invert(1);
          }
          @media (max-width: 640px) {
            .si-stack {
              width: 64px;
              height: 64px;
            }
            .sdk-integration {
              gap: 8px;
            }
          }
        `}</style>
      </div>
    );
  }
};
