'use client';

import {useI18n} from '../i18n-context';
import type {SlideDef} from '../deck-shell';

// 14 — Security (visual cards with icons)
export const SecuritySlide: SlideDef = {
  id: 'security',
  variant: 'dark',
  Body: () => {
    const {t} = useI18n();
    const items = [
      {key: '1', icon: '🛡️', ttl: t('sec_1_title'), desc: t('sec_1_desc')},
      {key: '2', icon: '🔐', ttl: t('sec_2_title'), desc: t('sec_2_desc')},
      {key: '3', icon: '🔗', ttl: t('sec_3_title'), desc: t('sec_3_desc')},
      {key: '4', icon: '⚖️', ttl: t('sec_4_title'), desc: t('sec_4_desc')}
    ];
    return (
      <div className="sec-frame deck-dot-grid">
        <div className="sec-head">
          <p className="deck-eyebrow">{t('sec_label')}</p>
          <p className="sec-kicker">{t('sec_kicker')}</p>
          <h1 className="sec-title">{t('sec_title')}</h1>
        </div>
        <div className="sec-grid">
          {items.map((it) => (
            <div className="sec-card" key={it.key}>
              <div
                className="sec-icon"
                style={{
                  background:
                    'color-mix(in srgb, var(--brand) 20%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--brand) 50%, transparent)'
                }}
              >
                <span>{it.icon}</span>
              </div>
              <h3>{it.ttl}</h3>
              <p>{it.desc}</p>
            </div>
          ))}
        </div>
        <style jsx>{`
          .sec-frame {
            height: 100%;
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
            background-color: var(--mp-ink);
          }
          .sec-head {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .sec-kicker {
            font: 500 clamp(20px, 2vw, 36px) / 1.2 var(--mp-font-display);
            color: var(--brand);
            margin: 0;
          }
          .sec-title {
            font: 500 var(--type-title) / 1.05 var(--mp-font-display);
            color: #fff;
            margin: 0;
            letter-spacing: -0.02em;
          }
          .sec-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(20px, 2vw, 28px);
          }
          .sec-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--mp-radius-lg);
            padding: clamp(20px, 2.5vw, 32px);
            display: flex;
            flex-direction: column;
            gap: 14px;
            transition: border-color 220ms;
          }
          .sec-card:hover {
            border-color: color-mix(in srgb, var(--brand) 40%, transparent);
          }
          .sec-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            border: 1px solid;
          }
          .sec-card h3 {
            font: 500 clamp(18px, 1.5vw, 22px) / 1.2 var(--mp-font-display);
            color: #fff;
            margin: 0;
          }
          .sec-card p {
            font: 400 clamp(14px, 1.1vw, 16px) / 1.55 var(--mp-font-body);
            color: rgba(255, 255, 255, 0.7);
            margin: 0;
          }
          @media (max-width: 900px) {
            .sec-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 15 — Benefits (visual, with brand-colored icon tiles)
export const BenefitsSlide: SlideDef = {
  id: 'benefits',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    const items = [
      {icon: '👑', ttl: t('ben_1_title'), desc: t('ben_1_desc')},
      {icon: '🚀', ttl: t('ben_2_title'), desc: t('ben_2_desc')},
      {icon: '⚡', ttl: t('ben_3_title'), desc: t('ben_3_desc')},
      {icon: '🧠', ttl: t('ben_4_title'), desc: t('ben_4_desc')}
    ];
    return (
      <div className="ben-frame">
        <div className="ben-head">
          <p className="deck-eyebrow">{t('ben_label')}</p>
          <p className="deck-kicker">{t('ben_kicker')}</p>
          <h1 className="deck-title-1">{t('ben_title')}</h1>
        </div>
        <div className="ben-grid">
          {items.map((it, i) => (
            <div className="ben-card" key={i}>
              <div
                className="ben-icon"
                style={{
                  background:
                    'color-mix(in srgb, var(--brand) 12%, var(--mp-white))',
                  color: 'var(--brand)'
                }}
              >
                {it.icon}
              </div>
              <div className="ben-body">
                <h3>{it.ttl}</h3>
                <p>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style jsx>{`
          .ben-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
          }
          .ben-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(20px, 2vw, 36px);
          }
          .ben-card {
            display: flex;
            gap: 20px;
            padding: clamp(20px, 2.5vw, 28px);
            border-radius: var(--mp-radius-lg);
            background: var(--mp-grey);
            border: 1px solid var(--mp-border-soft);
          }
          .ben-icon {
            flex-shrink: 0;
            width: 56px;
            height: 56px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            border: 1px solid color-mix(in srgb, var(--brand) 25%, transparent);
          }
          .ben-body h3 {
            font: 500 clamp(18px, 1.5vw, 22px) / 1.2 var(--mp-font-display);
            margin: 0 0 8px;
          }
          .ben-body p {
            font: 400 clamp(14px, 1.1vw, 16px) / 1.55 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 0;
          }
          @media (max-width: 900px) {
            .ben-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

// 16 — Implementation (45 min SDK, 3 services, code snippet, docs CTA)
export const ImplementationSlide: SlideDef = {
  id: 'implementation',
  variant: 'light',
  Body: () => {
    const {t} = useI18n();
    return (
      <div className="impl-frame">
        <div className="impl-head">
          <p className="deck-eyebrow">{t('impl_label')}</p>
          <p className="deck-kicker">{t('impl_kicker')}</p>
          <h1 className="deck-title-1">{t('impl_title')}</h1>
        </div>
        <div className="impl-stats">
          <div className="impl-stat hero">
            <span className="num" style={{color: 'var(--brand)'}}>
              {t('impl_hero_stat')}
            </span>
            <span className="lbl">{t('impl_hero_stat_label')}</span>
          </div>
          <div className="impl-stat">
            <span className="num">{t('impl_sprint_stat')}</span>
            <span className="lbl">{t('impl_sprint_stat_label')}</span>
          </div>
        </div>
        <div className="impl-services">
          <h3>{t('impl_services_title')}</h3>
          <div className="services-grid">
            <ServiceCard num={1} label={t('impl_service1')} method="POST" path="/payments/links" />
            <ServiceCard num={2} label={t('impl_service2')} method="POST" path="/payments/claim" />
            <ServiceCard num={3} label={t('impl_service3')} method="POST" path="/webhooks/events" />
          </div>
        </div>
        <div className="impl-code">
          <div className="code-head">
            <span className="code-dot" style={{background: '#FF5F54'}} />
            <span className="code-dot" style={{background: '#FFCF6B'}} />
            <span className="code-dot" style={{background: '#B5F2D3'}} />
            <span className="code-file">payment-link.swift</span>
          </div>
          <pre>
            <code>{`let link = try await magic.payments.create(
  amount: .mxn(500),
  recipient: .clabe("..."),
  channel: .whatsapp
)
// link.url -> "mgic.me/p/xK9..."`}</code>
          </pre>
        </div>
        <div className="impl-foot">
          <span className="impl-no-mig">{t('impl_no_migration')}</span>
          <a
            href={`https://${t('impl_docs_url')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="docs-cta"
            style={{background: 'var(--brand)'}}
          >
            {t('impl_docs_cta')} <span aria-hidden>→</span>
          </a>
        </div>
        <style jsx>{`
          .impl-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(20px, 3vh, 36px);
          }
          .impl-stats {
            display: flex;
            gap: clamp(24px, 4vw, 64px);
            align-items: flex-end;
            flex-wrap: wrap;
          }
          .impl-stat {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .impl-stat .num {
            font: 500 clamp(56px, 7vw, 96px) / 0.95 var(--mp-font-display);
            letter-spacing: -0.03em;
            color: var(--mp-ink);
          }
          .impl-stat .lbl {
            font: 400 clamp(14px, 1.2vw, 18px) / 1.3 var(--mp-font-body);
            color: var(--mp-fg-muted);
          }
          .impl-services h3 {
            font: 500 clamp(20px, 2vw, 28px) / 1.2 var(--mp-font-display);
            margin: 0 0 16px;
          }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .impl-code {
            background: var(--mp-ink);
            border-radius: var(--mp-radius-md);
            overflow: hidden;
            border: 1px solid var(--mp-border-soft);
          }
          .code-head {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 16px;
            background: rgba(255, 255, 255, 0.04);
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
          .code-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            opacity: 0.8;
          }
          .code-file {
            margin-left: 8px;
            font: 500 13px/1 var(--mp-font-body);
            color: rgba(255, 255, 255, 0.6);
          }
          .impl-code pre {
            margin: 0;
            padding: 20px 24px;
            font: 400 clamp(13px, 1vw, 15px) / 1.6 ui-monospace, 'SF Mono', Menlo,
              monospace;
            color: rgba(255, 255, 255, 0.92);
            white-space: pre;
            overflow-x: auto;
          }
          .impl-foot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
          }
          .impl-no-mig {
            font: 400 clamp(14px, 1.2vw, 17px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
          }
          .docs-cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 22px;
            border-radius: var(--mp-radius-pill);
            color: #fff;
            font: 500 clamp(14px, 1.2vw, 16px) / 1 var(--mp-font-body);
            text-decoration: none;
            box-shadow: var(--mp-shadow-cta);
            transition: transform 120ms;
          }
          .docs-cta:hover {
            transform: translateY(-1px);
          }
          @media (max-width: 800px) {
            .services-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};

function ServiceCard({
  num,
  label,
  method,
  path
}: {
  num: number;
  label: string;
  method: string;
  path: string;
}) {
  return (
    <div className="svc">
      <div className="svc-num" style={{background: 'var(--brand)'}}>
        {num}
      </div>
      <div className="svc-body">
        <div className="svc-label">{label}</div>
        <div className="svc-route">
          <span className="method">{method}</span>
          <code>{path}</code>
        </div>
      </div>
      <style jsx>{`
        .svc {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 16px 18px;
          background: var(--mp-grey);
          border-radius: var(--mp-radius-md);
          border: 1px solid var(--mp-border-soft);
        }
        .svc-num {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font: 500 14px/1 var(--mp-font-display);
        }
        .svc-label {
          font: 500 14px/1.3 var(--mp-font-body);
          color: var(--mp-ink);
        }
        .svc-route {
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          font: 500 12px/1 ui-monospace, 'SF Mono', Menlo, monospace;
        }
        .method {
          padding: 2px 8px;
          background: color-mix(in srgb, var(--brand) 14%, transparent);
          color: var(--brand);
          border-radius: 4px;
          font-size: 11px;
        }
        .svc-route code {
          color: var(--mp-fg-muted);
          background: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
}

// 17 — Regulatory (6 bullets, structured)
export const RegulatorySlide: SlideDef = {
  id: 'regulatory',
  variant: 'grey',
  Body: () => {
    const {t} = useI18n();
    const bullets = [t('reg_1'), t('reg_2'), t('reg_3'), t('reg_4'), t('reg_5'), t('reg_6')];
    return (
      <div className="reg-frame">
        <div className="reg-head">
          <p className="deck-eyebrow">{t('reg_label')}</p>
          <p className="deck-kicker">{t('reg_kicker')}</p>
          <h1 className="deck-title-1">{t('reg_title')}</h1>
        </div>
        <ul className="reg-list">
          {bullets.map((b, i) => (
            <li key={i}>
              <span className="reg-num" style={{color: 'var(--brand)'}}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="reg-text">{b}</span>
            </li>
          ))}
        </ul>
        <style jsx>{`
          .reg-frame {
            padding: var(--pad-top) var(--pad-x) var(--pad-bottom);
            display: flex;
            flex-direction: column;
            gap: clamp(28px, 4vh, 48px);
          }
          .reg-list {
            list-style: none;
            margin: 0;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px 28px;
          }
          .reg-list li {
            display: flex;
            gap: 16px;
            padding: 16px 18px;
            background: var(--mp-white);
            border-radius: var(--mp-radius-md);
            border: 1px solid var(--mp-border-soft);
          }
          .reg-num {
            font: 500 clamp(20px, 2vw, 28px) / 1 var(--mp-font-display);
            font-variant-numeric: tabular-nums;
            flex-shrink: 0;
          }
          .reg-text {
            font: 400 clamp(14px, 1.1vw, 16px) / 1.5 var(--mp-font-body);
            color: var(--mp-ink);
          }
          @media (max-width: 900px) {
            .reg-list {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }
};
