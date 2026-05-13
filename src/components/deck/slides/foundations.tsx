'use client';

import {useEffect, useState} from 'react';
import {useI18n} from '../i18n-context';
import {MagicKeyboard} from '../magic-keyboard';
import type {Locale} from '@/lib/deck/i18n';
import {useSlideNav, type SlideContext, type SlideDef} from '../deck-shell';

// 01 — Cover (C1 design: off-white + soft brand glow + phone mockup)
export const CoverSlide: SlideDef = {
  id: 'cover',
  variant: 'light',
  bare: true,
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    const isRegulator = client.kind === 'regulator';
    const initial = client.name.charAt(0).toUpperCase();
    return (
      <div className="cover-frame">
        <div className="cover-glow" aria-hidden />
        <div className="cover-content">
          <div className="cover-left">
            <div className="cover-pill">
              <span
                className="pill-letter"
                style={{background: 'var(--brand)'}}
              >
                {isRegulator ? (
                  // For regulator decks the "client" is a generic "el banco"
                  // — using the first letter ("E") looks like an accident.
                  // Swap to the magic mark so the pill still has a glyph.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/deck/logos/icon.svg"
                    alt=""
                    aria-hidden
                    className="pill-magic"
                  />
                ) : (
                  initial
                )}
              </span>
              <span className="pill-text">{t('cover_kicker')}</span>
            </div>
            <h1 className="cover-title">
              <span className="cover-magic">magic</span>{' '}
              <span className="cover-for-line">
                {t('cover_for')}{' '}
                <span className="cover-bank" style={{color: 'var(--brand)'}}>
                  {isRegulator
                    ? t('cover_regulator_audience')
                    : client.name}
                </span>
              </span>
            </h1>
            <p className="cover-subtitle">{t('cover_subtitle')}</p>
            <div className="cover-meta">
              <span>{t('cover_date')}</span>
            </div>
          </div>
          <div className="cover-keyboard">
            <div className="cover-stage">
              <div className="cover-bubbles" aria-hidden>
                <div className="bubble in">{t('cover_msg_them')}</div>
                <div className="bubble in">{t('cover_msg_amount')}</div>
                <div className="bubble out pay-link">
                  <span className="pl-icon" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/deck/logos/icon.svg" alt="" />
                  </span>
                  <span className="pl-text">
                    <span className="pl-amount">$300 MXN</span>
                    <span className="pl-url">mgic.me/xyz</span>
                  </span>
                </div>
              </div>
              <MagicKeyboard
                amount="300"
                recipientName={`${client.name} | Jonathan Moore`}
              />
            </div>
          </div>
        </div>
        <style jsx global>{`
          [data-slide-id='cover'] {
            padding: 0 !important;
          }
        `}</style>
        <style jsx>{`
          .cover-frame {
            position: absolute;
            inset: 0;
            padding: clamp(32px, 4vh, 56px) var(--pad-x) clamp(24px, 3vh, 40px);
            overflow: hidden;
            display: flex;
            align-items: center;
          }
          .cover-glow {
            position: absolute;
            top: -10vh;
            right: -8vw;
            width: 70vw;
            height: 70vw;
            background: radial-gradient(
              circle at center,
              color-mix(in srgb, var(--brand) 30%, transparent) 0%,
              color-mix(in srgb, var(--brand) 8%, transparent) 35%,
              transparent 60%
            );
            filter: blur(10px);
            pointer-events: none;
          }
          .cover-content {
            position: relative;
            display: grid;
            grid-template-columns: 1.4fr 1fr;
            gap: clamp(40px, 6vw, 100px);
            align-items: center;
            width: 100%;
          }
          .cover-pill {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 6px 16px 6px 6px;
            border-radius: var(--mp-radius-pill);
            background: var(--mp-white);
            border: 1px solid var(--mp-border-soft);
            font: 500 var(--type-eyebrow) / 1 var(--mp-font-body);
            color: var(--mp-fg-muted);
            letter-spacing: 0.06em;
            text-transform: uppercase;
            box-shadow: var(--mp-shadow-xs);
            margin-bottom: clamp(20px, 3vh, 40px);
          }
          .pill-letter {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            color: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font: 500 14px/1 var(--mp-font-display);
          }
          .pill-magic {
            width: 60%;
            height: 60%;
            filter: brightness(0) invert(1);
          }
          .cover-title {
            font: 500 clamp(48px, 7.5vw, 110px) / 0.98 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 0 0 clamp(20px, 2.5vh, 32px);
            color: var(--mp-ink);
          }
          .cover-magic {
            font-style: italic;
          }
          .cover-for-line {
            display: block;
            margin-top: 8px;
          }
          .cover-subtitle {
            font: 400 var(--type-body) / 1.45 var(--mp-font-body);
            color: var(--mp-fg);
            max-width: 600px;
            margin: 0 0 clamp(20px, 3vh, 40px);
          }
          .cover-meta {
            font: 400 clamp(14px, 1.1vw, 16px) / 1 var(--mp-font-body);
            color: var(--mp-fg-muted);
          }
          .cover-keyboard {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          .cover-stage {
            width: 340px;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
            transform: scale(1.15);
            transform-origin: center;
          }
          .cover-stage :global(.kb-preview) {
            max-width: 100%;
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.10),
              0 8px 24px rgba(0, 0, 0, 0.06);
          }
          .cover-bubbles {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: flex-start;
            padding: 0 6px;
          }
          .bubble {
            padding: 9px 14px;
            border-radius: 18px;
            font: 400 14px/1.35 -apple-system, 'SF Pro', system-ui, sans-serif;
            max-width: 78%;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
          }
          .bubble.in {
            background: #e9e9eb;
            color: #111;
            border-bottom-left-radius: 5px;
            align-self: flex-start;
          }
          .bubble.out {
            background: var(--brand);
            color: #fff;
            border-bottom-right-radius: 5px;
            align-self: flex-end;
          }
          .bubble.pay-link {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 7px 14px 7px 7px;
          }
          .pl-icon {
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.18);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          .pl-icon :global(img) {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
          }
          .pl-text {
            display: inline-flex;
            flex-direction: column;
            gap: 2px;
            min-width: 0;
          }
          .pl-amount {
            font: 600 14px/1.1 var(--mp-font-display);
            letter-spacing: -0.01em;
            font-variant-numeric: tabular-nums;
          }
          .pl-url {
            font: 500 11px/1 -apple-system, 'SF Pro', system-ui, sans-serif;
            opacity: 0.85;
          }
          @media (max-width: 900px) {
            .cover-content {
              grid-template-columns: 1fr;
              gap: 40px;
            }
            .cover-keyboard {
              order: -1;
            }
          }
          @media (max-width: 640px) {
            .cover-frame {
              position: relative;
              padding: 20px 18px 28px;
              align-items: stretch;
            }
            .cover-glow {
              top: -20vh;
              right: -30vw;
              width: 130vw;
              height: 130vw;
            }
            .cover-content {
              gap: 20px;
            }
            .cover-pill {
              margin-bottom: 14px;
              padding: 4px 12px 4px 4px;
              gap: 8px;
              font-size: 10px;
            }
            .pill-letter {
              width: 22px;
              height: 22px;
              font-size: 12px;
            }
            .cover-title {
              font-size: clamp(40px, 11vw, 60px);
              margin-bottom: 14px;
            }
            .cover-for-line {
              margin-top: 4px;
            }
            .cover-subtitle {
              font-size: 14px;
              line-height: 1.4;
              margin-bottom: 14px;
            }
            .cover-meta {
              font-size: 12px;
            }
            .cover-stage {
              transform: scale(0.78);
              transform-origin: top center;
              width: 320px;
              margin: 0 auto -50px;
            }
            .bubble {
              font-size: 12px;
              padding: 7px 11px;
            }
            .bubble.pay-link {
              padding: 5px 11px 5px 5px;
            }
            .pl-icon {
              width: 28px;
              height: 28px;
            }
            .pl-icon :global(img) {
              width: 16px;
              height: 16px;
            }
            .pl-amount {
              font-size: 12px;
            }
            .pl-url {
              font-size: 10px;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 02 — Background (Bruno bio: photo + name on top, two-column career story below)
// Drop a real photo at /public/deck/logos/bruno.jpg to replace the initials placeholder.
// Drop swap/clip wordmark/logo PNGs at /public/deck/logos/swap.png and clip.png.
export const BackgroundSlide: SlideDef = {
  id: 'background',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="bg-frame deck-dot-grid">
        <header className="bg-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/logos/bruno.jpg" alt="" aria-hidden className="bg-avatar" />
          <div className="bg-name-block">
            <h1 className="bg-name" style={{color: 'var(--brand)'}}>
              {t('bg_name')}
            </h1>
            <p className="bg-role">{t('bg_role')}</p>
          </div>
        </header>

        <div className="bg-cols">
          <div className="bg-col">
            <BrandTag tag="Swap" />
            <p className="bg-intro">
              <strong>{t('bg_swap_intro').split(',')[0]},</strong>
              {t('bg_swap_intro').slice(t('bg_swap_intro').indexOf(',') + 1)}
            </p>
            <ul className="bg-bullets">
              <li>{t('bg_swap_b1')}</li>
              <li>{t('bg_swap_b2')}</li>
              <li>{t('bg_swap_b3')}</li>
              <li>{t('bg_swap_b4')}</li>
            </ul>
          </div>

          <div className="bg-col">
            <BrandTag tag="Clip" />
            <p className="bg-intro">{t('bg_clip_intro')}</p>
            <ul className="bg-bullets">
              <li>{t('bg_clip_b1')}</li>
              <li>{t('bg_clip_b2')}</li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .bg-frame {
            height: 100%;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(24px, 3.5vh, 44px);
          }
          .bg-header {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .bg-avatar {
            width: clamp(64px, 5.5vw, 88px);
            height: clamp(64px, 5.5vw, 88px);
            border-radius: 50%;
            object-fit: cover;
            border: 1.5px solid color-mix(in srgb, var(--brand) 35%, transparent);
          }
          .bg-name {
            font: 500 clamp(36px, 4vw, 56px) / 1 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 0;
          }
          .bg-role {
            font: 400 clamp(16px, 1.3vw, 20px) / 1.3 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 4px 0 0;
          }
          .bg-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: clamp(28px, 3.5vw, 56px);
            flex: 1;
            min-height: 0;
          }
          .bg-col {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .bg-intro {
            font: 400 clamp(14px, 1.2vw, 17px) / 1.5 var(--mp-font-body);
            color: var(--mp-ink);
            margin: 0;
          }
          .bg-intro :global(strong) {
            font-weight: 500;
          }
          .bg-bullets {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .bg-bullets li {
            position: relative;
            padding-left: 22px;
            font: 400 clamp(13px, 1.1vw, 16px) / 1.5 var(--mp-font-body);
            color: var(--mp-fg);
          }
          .bg-bullets li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 9px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--brand);
            opacity: 0.5;
          }
          @media (max-width: 900px) {
            .bg-cols {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

function BrandTag({tag}: {tag: string}) {
  const colors: Record<string, string> = {
    Swap: '#3340D6',
    Clip: '#FF5F50'
  };
  return (
    <div className="brand-tag">
      <span className="logo-tile" style={{background: colors[tag] ?? 'var(--mp-ink)'}}>
        {tag.charAt(0)}
      </span>
      <span className="brand-name">{tag}</span>
      <style jsx>{`
        .brand-tag {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }
        .logo-tile {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font: 500 18px/1 var(--mp-font-display);
        }
        .brand-name {
          font: 500 clamp(20px, 1.8vw, 28px) / 1 var(--mp-font-display);
          color: var(--mp-ink);
        }
      `}</style>
    </div>
  );
}

// 03 — Infrastructure with rails growth chart
export const InfrastructureSlide: SlideDef = {
  id: 'infrastructure',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="infra-frame">
        <div className="infra-head">
          <p className="deck-eyebrow">{t('infra_label')}</p>
          <p className="deck-kicker infra-kicker">{t('infra_kicker')}</p>
          <h1 className="infra-title">{t('infra_title')}</h1>
        </div>
        <div className="infra-stats">
          <div className="deck-stat">
            <span className="num">{t('infra_stat1')}</span>
            <span className="lbl">{t('infra_stat1_label')}</span>
          </div>
          <div className="deck-stat">
            <span className="num">{t('infra_stat2')}</span>
            <span className="lbl">{t('infra_stat2_label')}</span>
          </div>
          <div className="deck-stat">
            <span className="num">{t('infra_stat3')}</span>
            <span className="lbl">{t('infra_stat3_label')}</span>
          </div>
        </div>
        <div className="infra-chart">
          <GrowthChart caption={t('infra_chart_caption')} />
        </div>
        <p className="infra-foot">{t('infra_footnote')}</p>
        <style jsx>{`
          .infra-frame {
            height: 100%;
            padding: clamp(28px, 3.5vh, 56px) var(--pad-x) clamp(24px, 3vh, 44px);
            display: flex;
            flex-direction: column;
            gap: clamp(12px, 1.8vh, 22px);
            min-height: 0;
          }
          .infra-kicker {
            margin-bottom: clamp(4px, 1vh, 10px);
            font-size: clamp(16px, 1.5vw, 24px);
          }
          .infra-title {
            font: 500 clamp(28px, 3.6vw, 52px) / 1.05 var(--mp-font-display);
            letter-spacing: -0.02em;
            margin: 0;
            color: var(--mp-ink);
            max-width: 1500px;
          }
          .infra-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(16px, 2vw, 32px);
            flex-shrink: 0;
          }
          .infra-stats :global(.deck-stat .num) {
            font-size: clamp(36px, 4.2vw, 64px);
            line-height: 1;
          }
          .infra-stats :global(.deck-stat .lbl) {
            font-size: clamp(12px, 1vw, 15px);
            margin-top: 4px;
          }
          .infra-chart {
            background: var(--mp-grey);
            border-radius: var(--mp-radius-lg);
            padding: clamp(12px, 1.6vw, 20px);
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }
          .infra-foot {
            font: 400 clamp(13px, 1.1vw, 16px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
            flex-shrink: 0;
          }
          @media (max-width: 900px) {
            .infra-stats {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

// Real growth chart — five real-time rails, billions of transactions, log scale.
// Sources: Banxico (SPEI), Banco Central do Brasil (Pix), NPCI (UPI), ECB
// payments statistics (SCT Inst — values estimated from published % of total
// SCT count + ECB-reported +72% YoY for 2024), Bizum (banks consortium press +
// 2024-2025 disclosures). 2015–2024 series.
const CHART_DATA: Record<string, {year: number; value: number}[]> = {
  spei: [
    {year: 2015, value: 0.335},
    {year: 2016, value: 0.44},
    {year: 2017, value: 0.55},
    {year: 2018, value: 0.77},
    {year: 2019, value: 0.848},
    {year: 2020, value: 1.226},
    {year: 2021, value: 2.028},
    {year: 2022, value: 2.787},
    {year: 2023, value: 3.823},
    {year: 2024, value: 5.418}
  ],
  pix: [
    {year: 2020, value: 0.025},
    {year: 2021, value: 2.0},
    {year: 2022, value: 24.0},
    {year: 2023, value: 44.0},
    {year: 2024, value: 64.0}
  ],
  upi: [
    {year: 2016, value: 0.01},
    {year: 2017, value: 0.92},
    {year: 2018, value: 3.5},
    {year: 2019, value: 10.0},
    {year: 2020, value: 18.0},
    {year: 2021, value: 38.0},
    {year: 2022, value: 74.0},
    {year: 2023, value: 117.6},
    {year: 2024, value: 165.0}
  ],
  sct_inst: [
    {year: 2018, value: 0.04},
    {year: 2019, value: 0.15},
    {year: 2020, value: 0.4},
    {year: 2021, value: 0.8},
    {year: 2022, value: 1.4},
    {year: 2023, value: 2.7},
    {year: 2024, value: 5.0}
  ],
  bizum: [
    {year: 2018, value: 0.05},
    {year: 2019, value: 0.12},
    {year: 2020, value: 0.25},
    {year: 2021, value: 0.5},
    {year: 2022, value: 0.7},
    {year: 2023, value: 1.0},
    {year: 2024, value: 1.1}
  ]
};

function GrowthChart({caption}: {caption: string}) {
  const W = 1000;
  const H = 380;
  const pad = {l: 56, r: 24, t: 28, b: 44};
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const minYear = 2015;
  const maxYear = 2024;
  // Log scale (base 10) — required to show 4+ orders of magnitude (0.01B to 165B).
  const logMin = -2; // 0.01B
  const logMax = Math.log10(200); // headroom above UPI 165
  const yPos = (v: number) => {
    const logV = Math.log10(Math.max(v, 0.005));
    return pad.t + innerH - ((logV - logMin) / (logMax - logMin)) * innerH;
  };
  const xPos = (year: number) => pad.l + ((year - minYear) / (maxYear - minYear)) * innerW;
  const yTicks = [0.1, 1, 10, 100];
  const xTicks = [2015, 2017, 2019, 2021, 2024];
  const fmtTick = (t: number) => (t < 1 ? `${t}B` : `${t}B`);

  // Each series owns its own end-of-line label offset so we can manually pull
  // SCT Inst and SPEI apart — both land near 5B in 2024 and would otherwise
  // collide on a log scale (Δ ~3px between them).
  const series: Array<{
    key: string;
    label: string;
    color: string;
    data: typeof CHART_DATA.spei;
    labelDy?: number;
  }> = [
    {key: 'upi', label: 'UPI · India', color: '#FF8A3D', data: CHART_DATA.upi},
    {key: 'pix', label: 'Pix · Brasil', color: '#22B574', data: CHART_DATA.pix},
    {
      key: 'sct_inst',
      label: 'SCT Inst · Europa',
      color: '#7C3AED',
      data: CHART_DATA.sct_inst,
      labelDy: -26
    },
    {
      key: 'spei',
      label: 'SPEI · México',
      color: 'var(--brand)',
      data: CHART_DATA.spei,
      labelDy: 16
    },
    {
      key: 'bizum',
      label: 'Bizum · España',
      color: '#06B6D4',
      data: CHART_DATA.bizum
    }
  ];

  const buildPath = (data: typeof CHART_DATA.spei) =>
    data.map((p, i) => `${i === 0 ? 'M' : 'L'}${xPos(p.year).toFixed(1)} ${yPos(p.value).toFixed(1)}`).join(' ');

  return (
    <div className="growth">
      <div className="growth-head">
        <h3>Crecimiento de pagos en tiempo real (mil millones de tx/año)</h3>
        <div className="growth-legend">
          {series.map((s) => (
            <span key={s.key} className="legend-item">
              <span className="dot" style={{background: s.color}} />
              {s.label}
            </span>
          ))}
        </div>
      </div>
      <div className="growth-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="growth-svg" preserveAspectRatio="none">
          {/* Y-axis linear gridlines */}
          {yTicks.map((t) => (
            <g key={`y-${t}`}>
              <line
                x1={pad.l}
                x2={W - pad.r}
                y1={yPos(t)}
                y2={yPos(t)}
                stroke="rgba(0,0,0,0.06)"
                strokeDasharray="4 4"
              />
              <text
                x={pad.l - 10}
                y={yPos(t) + 4}
                textAnchor="end"
                fontSize="13"
                fill="var(--mp-fg-muted)"
                fontFamily="var(--mp-font-body)"
              >
                {fmtTick(t)}
              </text>
            </g>
          ))}
          {/* X-axis ticks */}
          {xTicks.map((t) => (
            <text
              key={`x-${t}`}
              x={xPos(t)}
              y={H - pad.b + 22}
              textAnchor="middle"
              fontSize="13"
              fill="var(--mp-fg-muted)"
              fontFamily="var(--mp-font-body)"
            >
              {t}
            </text>
          ))}
          {/* Series — animated draw on mount */}
          {series.map((s, sIdx) => (
            <g key={s.key} className="series" style={{animationDelay: `${sIdx * 200}ms`}}>
              <path
                d={buildPath(s.data)}
                fill="none"
                stroke={s.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="series-line"
              />
              {s.data.map((p, i) => (
                <circle
                  key={`${s.key}-${p.year}`}
                  cx={xPos(p.year)}
                  cy={yPos(p.value)}
                  r="4"
                  fill={s.color}
                  className="series-dot"
                  style={{animationDelay: `${sIdx * 200 + 1400 + i * 30}ms`}}
                />
              ))}
              {/* Latest value label — series can override the default
                  "-12 above the line" offset via labelDy to avoid collisions. */}
              {(() => {
                const last = s.data[s.data.length - 1];
                const dy = s.labelDy ?? -12;
                return (
                  <text
                    x={xPos(last.year) - 4}
                    y={yPos(last.value) + dy}
                    textAnchor="end"
                    fontSize="14"
                    fontWeight="600"
                    fill={s.color}
                    fontFamily="var(--mp-font-display)"
                    className="series-label"
                    style={{animationDelay: `${sIdx * 200 + 1700}ms`}}
                  >
                    {last.value < 1
                      ? last.value.toFixed(1)
                      : Math.round(last.value)}B
                  </text>
                );
              })()}
            </g>
          ))}
        </svg>
      </div>
      <p className="growth-caption">{caption}</p>
      <style jsx>{`
        .growth {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-height: 0;
        }
        .growth-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
          flex-wrap: nowrap;
          flex-shrink: 0;
        }
        .growth-head h3 {
          font: 500 clamp(15px, 1.3vw, 18px) / 1.3 var(--mp-font-body);
          color: var(--mp-ink);
          margin: 0;
        }
        .growth-legend {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font: 500 clamp(12px, 1vw, 14px) / 1 var(--mp-font-body);
          color: var(--mp-fg-muted);
        }
        .legend-item .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .growth-svg-wrap {
          flex: 1;
          min-height: 0;
        }
        .growth-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        .growth-svg :global(.series-line) {
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: drawLine 1500ms cubic-bezier(0.65, 0, 0.35, 1) forwards;
          animation-delay: inherit;
        }
        .growth-svg :global(.series-dot) {
          opacity: 0;
          animation: fadeIn 200ms ease forwards;
          animation-delay: inherit;
        }
        .growth-svg :global(.series-label) {
          opacity: 0;
          animation: fadeIn 320ms ease forwards;
          animation-delay: inherit;
        }
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .growth-caption {
          font: 400 clamp(11px, 0.95vw, 14px) / 1.4 var(--mp-font-body);
          color: var(--mp-fg-muted);
          margin: 0;
          max-width: 900px;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}

// 04 — WhatsApp dominance + chat icons strip
export const WhatsappSlide: SlideDef = {
  id: 'whatsapp',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="wa-frame">
        <div className="wa-head">
          <p className="deck-eyebrow">{t('wa_label')}</p>
          <p className="deck-kicker">{t('wa_kicker')}</p>
          <h1 className="deck-title-1">{t('wa_title')}</h1>
        </div>
        <div className="wa-stats">
          <div className="deck-stat">
            <span className="num">{t('wa_stat1')}</span>
            <span className="lbl">{t('wa_stat1_label')}</span>
          </div>
          <div className="deck-stat">
            <span className="num">{t('wa_stat2')}</span>
            <span className="lbl">{t('wa_stat2_label')}</span>
          </div>
          <div className="deck-stat">
            <span className="num">{t('wa_stat3')}</span>
            <span className="lbl">{t('wa_stat3_label')}</span>
          </div>
        </div>
        <div className="wa-chats">
          <ChatTile
            label="WhatsApp"
            big
            bg="#25D366"
            icon={<WhatsappIcon />}
            markets={['🇲🇽', '🇧🇷', '🇪🇸', '🇮🇳', '🇮🇩']}
            marketsExtra="+100"
          />
          <ChatTile
            label="iMessage"
            bg="#0BA5EC"
            icon={<IMessageIcon />}
            markets={['🇺🇸']}
          />
          <ChatTile
            label="LINE"
            bg="#06C755"
            icon={<LineIcon />}
            markets={['🇯🇵', '🇹🇭', '🇹🇼']}
          />
          <ChatTile
            label="KakaoTalk"
            bg="#FEE500"
            icon={<KakaoIcon />}
            markets={['🇰🇷']}
          />
          <ChatTile
            label="Telegram"
            bg="#26A5E4"
            icon={<TelegramIcon />}
            markets={['🇷🇺', '🇮🇷', '🇺🇦']}
          />
          <ChatTile
            label="Messenger"
            bg="linear-gradient(135deg,#0099FF,#A033FF,#FF4D9D)"
            icon={<MessengerIcon />}
          />
          <ChatTile
            label="Instagram"
            bg="linear-gradient(135deg,#FFC93C,#FF6B6B,#A537FD)"
            icon={<InstagramIcon />}
          />
        </div>
        <p className="wa-quote">&ldquo;{t('wa_quote')}&rdquo;</p>
        <style jsx>{`
          .wa-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(24px, 3.5vh, 44px);
          }
          .wa-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(16px, 2vw, 32px);
          }
          .wa-chats {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }
          /* Chat tiles styling moved into ChatTile component */
          .wa-quote {
            font: 500 clamp(20px, 2vw, 28px) / 1.4 var(--mp-font-display);
            color: var(--mp-ink);
            max-width: 1100px;
            margin: 0;
          }
          @media (max-width: 900px) {
            .wa-stats {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 640px) {
            .wa-frame {
              gap: 16px;
            }
            .wa-stats {
              grid-template-columns: repeat(3, 1fr);
              gap: 8px;
            }
            .wa-stats :global(.deck-stat .num) {
              font-size: clamp(28px, 9vw, 40px);
              line-height: 1;
            }
            .wa-stats :global(.deck-stat .lbl) {
              font-size: 11px;
              line-height: 1.25;
            }
            .wa-chats {
              gap: 10px;
            }
            .wa-quote {
              font-size: 15px;
              line-height: 1.45;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 05 — Problem (big quote, dark variant)
export const ProblemSlide: SlideDef = {
  id: 'problem',
  variant: 'dark',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="prob-frame deck-dot-grid">
        <p className="deck-eyebrow">{t('prob_label')}</p>
        <h1 className="prob-quote">
          {t('prob_quote')
            .split('\n')
            .map((line, i) => (
              <span key={i} className="prob-line">
                {line}
              </span>
            ))}
        </h1>
        <p className="prob-caption">{t('prob_caption')}</p>
        <style jsx>{`
          .prob-frame {
            height: 100%;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: var(--mp-ink);
          }
          .prob-quote {
            font: 500 clamp(40px, 6vw, 88px) / 1.05 var(--mp-font-display);
            letter-spacing: -0.02em;
            color: #fff;
            margin: 24px 0 32px;
            max-width: 1400px;
          }
          .prob-line {
            display: block;
          }
          .prob-line:nth-child(2) {
            color: var(--brand);
          }
          .prob-caption {
            font: 400 clamp(16px, 1.4vw, 22px) / 1.5 var(--mp-font-body);
            color: rgba(255, 255, 255, 0.7);
            max-width: 900px;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }
};

// 06 — Flow comparison (today vs saved vs magic)
const FLOW_STEPS: Record<
  Locale,
  {today: string[]; saved: string[]; magic: string[]}
> = {
  es: {
    today: [
      'cambiando entre apps',
      'buscando la app del banco',
      'iniciando sesión',
      'nueva transferencia',
      'nuevo destinatario',
      'capturando nombre',
      'volviendo al chat por la cuenta',
      'capturando la cuenta',
      'capturando monto',
      'capturando concepto',
      'siguiente',
      'confirmando transacción'
    ],
    saved: [
      'cambiando entre apps',
      'abriendo la app del banco',
      'iniciando sesión',
      'nueva transferencia',
      'eligiendo contacto guardado',
      'capturando monto',
      'capturando concepto',
      'siguiente',
      'confirmando transacción'
    ],
    magic: ['cambiando de teclado', 'capturando monto', 'enviando']
  },
  en: {
    today: [
      'switching apps',
      'finding the bank app',
      'logging in',
      'new transfer',
      'new recipient',
      'entering name',
      'going back for the account',
      'entering account number',
      'entering amount',
      'entering concept',
      'next',
      'confirming transaction'
    ],
    saved: [
      'switching apps',
      'opening the bank app',
      'logging in',
      'new transfer',
      'picking saved contact',
      'entering amount',
      'entering concept',
      'next',
      'confirming transaction'
    ],
    magic: ['switching keyboard', 'entering amount', 'sending']
  }
};

export const FlowSlide: SlideDef = {
  id: 'flow',
  variant: 'light',
  Body: () => {
    const {t, locale} = useI18n();
    const steps = FLOW_STEPS[locale];
    const doneLabel = t('flow_done');

    // Reveal rows one at a time. Next advances within the slide until all three
    // rows are visible, then yields to the deck so it can move on to slide 07.
    // Prev peels rows back before yielding to the deck. Both the keyboard
    // arrows and the on-screen nav buttons (mobile + desktop) route through
    // the deck's SlideNav interceptor, so this single source of truth handles
    // every input method.
    const [revealed, setRevealed] = useState(1);
    const {registerInterceptor} = useSlideNav();

    useEffect(() => {
      return registerInterceptor((dir) => {
        if (dir === 'next') {
          if (revealed < 3) {
            setRevealed(revealed + 1);
            return true;
          }
          return false;
        }
        if (revealed > 1) {
          setRevealed(revealed - 1);
          return true;
        }
        return false;
      });
    }, [registerInterceptor, revealed]);

    const rows = [
      {
        key: 'today',
        label: t('flow_today_label'),
        meta: t('flow_today_meta'),
        taps: 90,
        kind: 'muted' as const,
        stepMs: 75,
        steps: steps.today
      },
      {
        key: 'saved',
        label: t('flow_saved_label'),
        meta: t('flow_saved_meta'),
        taps: 35,
        kind: 'medium' as const,
        stepMs: 110,
        steps: steps.saved
      },
      {
        key: 'magic',
        label: t('flow_magic_label'),
        meta: t('flow_magic_meta'),
        taps: 3,
        kind: 'brand' as const,
        stepMs: 110,
        steps: steps.magic
      }
    ];

    return (
      <div className="flow-frame">
        <div className="flow-head">
          <p className="deck-eyebrow">{t('flow_label')}</p>
          <h1 className="deck-title-1">{t('flow_title')}</h1>
        </div>
        <div className="flow-rows">
          {rows.slice(0, revealed).map((r) => (
            <FlowRow
              key={r.key}
              label={r.label}
              meta={r.meta}
              taps={r.taps}
              kind={r.kind}
              stepMs={r.stepMs}
              steps={r.steps}
              doneLabel={doneLabel}
            />
          ))}
        </div>
        <style jsx>{`
          .flow-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
          }
          .flow-rows {
            display: flex;
            flex-direction: column;
            gap: 24px;
            width: 100%;
            max-width: 700px;
            align-self: flex-start;
          }
          @media (max-width: 640px) {
            .flow-frame {
              gap: 18px;
            }
            .flow-rows {
              max-width: none;
              align-self: stretch;
              gap: 14px;
            }
          }
        `}</style>
      </div>
    );
  }
};

function FlowRow({
  label,
  meta,
  taps,
  kind,
  stepMs,
  steps,
  doneLabel
}: {
  label: string;
  meta: string;
  taps: number;
  kind: 'muted' | 'medium' | 'brand';
  stepMs: number;
  steps: string[];
  doneLabel: string;
}) {
  const dots = Math.min(taps, 90);
  const totalMs = taps * stepMs + 200;

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    const start = performance.now();
    const tick = (now: number) => {
      if (cancelled) return;
      const e = now - start;
      setElapsed(e);
      if (e < totalMs) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [totalMs]);

  const done = elapsed >= totalMs;
  const progress = Math.min(elapsed / totalMs, 1);
  const stepIndex = done
    ? steps.length - 1
    : Math.min(Math.floor(progress * steps.length), steps.length - 1);

  return (
    <div className={`flow-row kind-${kind} ${done ? 'is-done' : ''}`}>
      <div className="flow-row-head">
        <div className="flow-row-head-text">
          <span className="flow-row-label">{label}</span>
          <span className="flow-row-step" aria-live="polite">
            {done ? (
              <>
                <svg className="step-check" viewBox="0 0 16 16" aria-hidden>
                  <path
                    d="M3.5 8.5l3 3 6-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {doneLabel}
              </>
            ) : (
              <>
                <span className="step-caret">›</span>
                {steps[stepIndex]}
                <span className="step-ellipsis" aria-hidden>
                  <span />
                  <span />
                  <span />
                </span>
              </>
            )}
          </span>
        </div>
        <span className="flow-row-meta">{meta}</span>
      </div>
      <div className="flow-row-dots-wrap">
        <div className="flow-row-dots">
          {Array.from({length: dots}).map((_, i) => (
            <span
              key={i}
              className="dot"
              style={{animationDelay: `${i * stepMs}ms`}}
            />
          ))}
        </div>
        <span className="paid" aria-hidden>
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" />
            <path
              d="M7 12.5l3.2 3.2L17 8.6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <style jsx>{`
        .flow-row {
          padding: 20px 24px;
          border-radius: var(--mp-radius-lg);
          background: var(--mp-grey);
          border: 1px solid var(--mp-border-soft);
          transition: border-color 280ms var(--mp-ease),
            background 280ms var(--mp-ease);
        }
        .flow-row.kind-brand {
          background: color-mix(in srgb, var(--brand) 8%, var(--mp-white));
          border-color: color-mix(in srgb, var(--brand) 30%, transparent);
        }
        .flow-row.is-done {
          border-color: color-mix(in srgb, var(--brand) 45%, transparent);
        }
        .flow-row-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
          gap: 16px;
        }
        .flow-row-head-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1;
        }
        .flow-row-label {
          font: 500 clamp(15px, 1.2vw, 18px) / 1.2 var(--mp-font-body);
          color: var(--mp-ink);
        }
        .flow-row-step {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font: 400 clamp(12px, 0.95vw, 14px) / 1.2
            var(--mp-font-mono, var(--mp-font-body));
          color: var(--mp-fg-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
          min-height: 1.2em;
        }
        .flow-row.is-done .flow-row-step {
          color: var(--brand);
        }
        .step-caret {
          color: var(--mp-fg-muted);
          font-weight: 600;
        }
        .step-check {
          width: 14px;
          height: 14px;
          color: var(--brand);
        }
        .step-ellipsis {
          display: inline-flex;
          gap: 2px;
          margin-left: 2px;
        }
        .step-ellipsis span {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.35;
          animation: step-blink 1200ms ease-in-out infinite;
        }
        .step-ellipsis span:nth-child(2) {
          animation-delay: 200ms;
        }
        .step-ellipsis span:nth-child(3) {
          animation-delay: 400ms;
        }
        @keyframes step-blink {
          0%,
          100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-1px);
          }
        }
        .flow-row-meta {
          font: 500 clamp(12px, 0.95vw, 14px) / 1.2 var(--mp-font-body);
          color: var(--mp-fg-muted);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.01em;
          padding-top: 2px;
          white-space: nowrap;
        }
        .flow-row.kind-brand .flow-row-meta,
        .flow-row.is-done .flow-row-meta {
          color: var(--brand);
        }
        .flow-row-dots-wrap {
          display: flex;
          align-items: flex-end;
          gap: 14px;
        }
        .flow-row-dots {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(23, minmax(0, 1fr));
          gap: 8px 6px;
          justify-items: center;
          align-items: center;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--mp-neutral-400);
          opacity: 0;
          transform: scale(0.4);
          animation: dot-in 280ms var(--mp-ease) both;
        }
        .flow-row.kind-medium .dot {
          background: var(--mp-neutral-500);
        }
        .flow-row.kind-brand .dot {
          background: var(--brand);
        }
        @keyframes dot-in {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .paid {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          color: var(--brand);
          opacity: 0;
          transform: scale(0.4);
          transition: opacity 320ms var(--mp-ease),
            transform 320ms var(--mp-ease);
        }
        .paid :global(svg) {
          width: 100%;
          height: 100%;
        }
        .paid :global(circle) {
          fill: color-mix(in srgb, var(--brand) 16%, transparent);
          stroke: color-mix(in srgb, var(--brand) 55%, transparent);
          stroke-width: 1.2;
        }
        .flow-row.is-done .paid {
          opacity: 1;
          transform: scale(1);
        }
        @media (max-width: 640px) {
          .flow-row {
            padding: 14px 14px;
          }
          .flow-row-head {
            margin-bottom: 10px;
            gap: 8px;
            flex-direction: column;
            align-items: flex-start;
          }
          .flow-row-meta {
            font-size: 11px;
            padding-top: 0;
          }
          .flow-row-label {
            font-size: 13px;
            line-height: 1.25;
          }
          .flow-row-step {
            font-size: 11px;
          }
          .flow-row-dots-wrap {
            gap: 8px;
          }
          .flow-row-dots {
            grid-template-columns: repeat(23, minmax(0, 1fr));
            gap: 5px 3px;
          }
          .dot {
            width: 7px;
            height: 7px;
          }
          .paid {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}

// 07 — What is magic (3-bullets + SDK integration visual)
export const WhatIsMagicSlide: SlideDef = {
  id: 'what-is-magic',
  variant: 'light',
  Body: ({client}: SlideContext) => {
    const {t} = useI18n();
    const isRegulator = client.kind === 'regulator';
    const appIcon = client.app_icon_url ?? client.logo_url;
    const b1Title = isRegulator
      ? t('magic_b1_title_regulator')
      : t('magic_b1_title');
    return (
      <div className="magic-frame">
        <div className="magic-head">
          <div className="magic-head-row">
            <div className="magic-head-text">
              <p className="deck-eyebrow">{t('magic_label')}</p>
              <p className="deck-kicker">{t('magic_kicker')}</p>
              <h1 className="deck-title-1">{t('magic_title')}</h1>
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
                <span className="si-caption">
                  SDK integrado en {client.name}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="magic-bullets">
          {[
            {n: 1, ttl: b1Title, desc: t('magic_b1_desc')},
            {n: 2, ttl: t('magic_b2_title'), desc: t('magic_b2_desc')},
            {n: 3, ttl: t('magic_b3_title'), desc: t('magic_b3_desc')}
          ].map((b) => (
            <div className="magic-bullet" key={b.n}>
              <div className="bullet-num" style={{background: 'var(--brand)'}}>
                {b.n}
              </div>
              <div className="bullet-body">
                <h3>{b.ttl}</h3>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="magic-modes">
          <span className="modes-label">{t('magic_modes_label')}</span>
          <span className="modes" style={{color: 'var(--brand)'}}>
            {t('magic_modes')}
          </span>
        </div>
        <style jsx>{`
          .magic-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
          }
          .magic-head-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: clamp(20px, 3vw, 48px);
            flex-wrap: wrap;
          }
          .magic-head-text {
            min-width: 0;
            flex: 1;
          }
          .sdk-integration {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
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
          .si-caption {
            font: 500 clamp(11px, 1vw, 13px) / 1.2 var(--mp-font-body);
            color: var(--mp-fg-muted);
            letter-spacing: 0.02em;
            text-align: center;
          }
          .magic-bullets {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(20px, 2.5vw, 36px);
          }
          .magic-bullet {
            background: var(--mp-grey);
            border-radius: var(--mp-radius-lg);
            padding: clamp(20px, 2.5vw, 32px);
            display: flex;
            gap: 16px;
            align-items: flex-start;
          }
          .bullet-num {
            flex-shrink: 0;
            width: 36px;
            height: 36px;
            border-radius: 10px;
            color: #fff;
            font: 500 18px/1 var(--mp-font-display);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .bullet-body h3 {
            font: 500 clamp(18px, 1.5vw, 22px) / 1.2 var(--mp-font-display);
            margin: 0 0 8px;
          }
          .bullet-body p {
            font: 400 clamp(14px, 1.1vw, 16px) / 1.55 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
          }
          .magic-modes {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .modes-label {
            font: 400 clamp(14px, 1.1vw, 16px) / 1 var(--mp-font-body);
            color: var(--mp-fg-muted);
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }
          .modes {
            font: 500 clamp(28px, 3vw, 44px) / 1.1 var(--mp-font-display);
            letter-spacing: -0.01em;
          }
          @media (max-width: 900px) {
            .magic-bullets {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 640px) {
            .magic-frame {
              gap: 16px;
            }
            .magic-head-row {
              gap: 14px;
              align-items: flex-start;
            }
            .magic-head-text :global(.deck-kicker) {
              font-size: 16px;
              margin-bottom: 6px;
            }
            .magic-head-text :global(.deck-title-1) {
              font-size: clamp(22px, 6.5vw, 28px);
              line-height: 1.15;
            }
            .si-stack {
              width: 56px;
              height: 56px;
            }
            .si-caption {
              font-size: 10px;
            }
            .magic-bullets {
              gap: 10px;
            }
            .magic-bullet {
              padding: 14px;
              gap: 12px;
            }
            .bullet-num {
              width: 28px;
              height: 28px;
              font-size: 14px;
              border-radius: 8px;
            }
            .bullet-body h3 {
              font-size: 15px;
              margin-bottom: 4px;
            }
            .bullet-body p {
              font-size: 13px;
              line-height: 1.45;
            }
            .magic-modes {
              gap: 4px;
            }
            .modes-label {
              font-size: 11px;
            }
            .modes {
              font-size: 22px;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 09 — 30x speed comparison
export const ThirtyXSlide: SlideDef = {
  id: 'thirty-x',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="x-frame">
        <div className="x-glow" aria-hidden />
        <div className="x-content">
          <p className="deck-eyebrow">{t('thirtyx_label')}</p>
          <div className="x-hero">
            <span className="x-big" style={{color: 'var(--brand)'}}>
              {t('thirtyx_big')}
            </span>
            <span className="x-kicker">{t('thirtyx_kicker')}</span>
          </div>
          <p className="x-caption">{t('thirtyx_caption')}</p>
          <div className="x-compare">
            <div className="x-compare-row muted">
              <span className="x-dot" />
              <span>{t('thirtyx_today')}</span>
            </div>
            <div className="x-compare-row medium">
              <span className="x-dot" />
              <span>{t('thirtyx_saved')}</span>
            </div>
            <div className="x-compare-row brand">
              <span className="x-dot" style={{background: 'var(--brand)'}} />
              <span>{t('thirtyx_magic')}</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .x-frame {
            position: relative;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            height: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
          }
          .x-glow {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 80vw;
            height: 80vw;
            background: radial-gradient(
              circle,
              color-mix(in srgb, var(--brand) 18%, transparent) 0%,
              transparent 50%
            );
            pointer-events: none;
          }
          .x-content {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: clamp(20px, 3vh, 36px);
            max-width: 1100px;
          }
          .x-hero {
            display: flex;
            align-items: baseline;
            gap: 24px;
            flex-wrap: wrap;
          }
          .x-big {
            font: 500 clamp(180px, 24vw, 360px) / 0.85 var(--mp-font-display);
            letter-spacing: -0.05em;
          }
          .x-kicker {
            font: 500 clamp(36px, 4vw, 72px) / 1 var(--mp-font-display);
            color: var(--mp-ink);
          }
          .x-caption {
            font: 400 clamp(18px, 1.6vw, 24px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            max-width: 800px;
            margin: 0;
          }
          .x-compare {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 16px;
          }
          .x-compare-row {
            display: flex;
            align-items: center;
            gap: 14px;
            padding: 12px 18px;
            border-radius: var(--mp-radius-pill);
            background: var(--mp-white);
            border: 1px solid var(--mp-border-soft);
            font: 500 clamp(15px, 1.2vw, 18px) / 1 var(--mp-font-body);
            color: var(--mp-ink);
            max-width: 540px;
          }
          .x-compare-row.muted {
            color: var(--mp-fg-muted);
          }
          .x-compare-row.brand {
            border-color: color-mix(in srgb, var(--brand) 30%, transparent);
            background: color-mix(in srgb, var(--brand) 8%, var(--mp-white));
            font-weight: 500;
          }
          .x-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--mp-neutral-400);
          }
          .x-compare-row.medium .x-dot {
            background: var(--mp-neutral-500);
          }
        `}</style>
      </div>
    );
  }
};

// ---------- ChatTile + brand icons (inline SVG) ----------

function ChatTile({
  label,
  big,
  bg,
  icon,
  markets,
  marketsExtra
}: {
  label: string;
  big?: boolean;
  bg: string;
  icon: React.ReactNode;
  /** Flag emojis for the markets where this chat is the dominant channel. */
  markets?: string[];
  /** Extra trailing token after the flags, e.g. "+100" or "y más". */
  marketsExtra?: string;
}) {
  return (
    <div className={`chat-tile ${big ? 'big' : ''}`}>
      <span className="chat-icon" style={{background: bg}}>
        {icon}
      </span>
      <span className="chat-text">
        <span className="chat-label">{label}</span>
        {markets && markets.length > 0 && (
          <span className="chat-markets" aria-hidden>
            {markets.join(' ')}
            {marketsExtra && <span className="chat-markets-extra"> {marketsExtra}</span>}
          </span>
        )}
      </span>
      <style jsx>{`
        .chat-tile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px 10px 10px;
          background: var(--mp-grey);
          border-radius: var(--mp-radius-pill);
          border: 1px solid var(--mp-border-soft);
        }
        .chat-tile.big {
          padding: 12px 22px 12px 12px;
          background: color-mix(in srgb, var(--brand) 6%, var(--mp-white));
          border-color: color-mix(in srgb, var(--brand) 25%, transparent);
        }
        .chat-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .chat-icon :global(svg) {
          width: 60%;
          height: 60%;
        }
        .chat-tile.big .chat-icon {
          width: 44px;
          height: 44px;
        }
        .chat-text {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          min-width: 0;
        }
        .chat-label {
          font: 500 clamp(13px, 1.1vw, 16px) / 1 var(--mp-font-body);
          color: var(--mp-ink);
        }
        .chat-markets {
          font: 500 clamp(10px, 0.85vw, 12px) / 1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          letter-spacing: 0.02em;
        }
        .chat-markets-extra {
          color: var(--mp-fg-muted);
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.768.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function IMessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M12 2C5.925 2 1 6.227 1 11.5c0 2.86 1.45 5.42 3.74 7.18-.18 1.13-.62 2.32-1.27 3.04-.13.14-.04.36.15.36 1.99-.05 3.84-.59 5.36-1.51 1 .26 2.05.42 3.02.42 6.075 0 11-4.227 11-9.49C23 6.227 18.075 2 12 2Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.17.16.14.26.34.27.56l.05 1.78c.02.57.6.94 1.12.71l1.99-.88c.17-.07.36-.09.54-.04 1.02.28 2.1.43 3.21.43 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2Zm6 7.46l-2.94 4.66c-.47.74-1.47.93-2.18.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.62l2.94-4.66c.47-.74 1.47-.93 2.18-.4l2.34 1.75c.21.16.51.16.72 0l3.16-2.4c.42-.32.97.18.69.62Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="white" />
    </svg>
  );
}

// LINE: white wordmark on a green tile.
function LineIcon() {
  return (
    <svg viewBox="0 0 32 24">
      <text
        x="16"
        y="17"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="white"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-0.4"
      >
        LINE
      </text>
    </svg>
  );
}

// KakaoTalk: brown speech-bubble glyph on the yellow tile.
function KakaoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="#3A1D1D">
      <path d="M12 4C6.48 4 2 7.42 2 11.55c0 2.64 1.83 4.95 4.56 6.27l-.94 3.45c-.05.19.16.34.32.23l4.09-2.7c.65.1 1.3.15 1.97.15 5.52 0 10-3.42 10-7.55S17.52 4 12 4Z" />
    </svg>
  );
}
