'use client';

import {useI18n} from '../i18n-context';
import {eyebrow} from '@/lib/deck/eyebrow';
import type {SlideContext, SlideDef} from '../deck-shell';

// 14 — Security (visual cards with icons)
export const SecuritySlide: SlideDef = {
  id: 'security',
  variant: 'dark',
  Body: ({client, index}: SlideContext) => {
    const {t} = useI18n();
    const isRegulator = client.kind === 'regulator';
    const fillClient = (s: string) => s.replaceAll('{client}', client.name);
    const sec2Title = isRegulator
      ? t('sec_2_title_regulator')
      : fillClient(t('sec_2_title'));
    const items = [
      {key: '1', icon: '🛡️', ttl: t('sec_1_title'), desc: t('sec_1_desc')},
      {key: '2', icon: '🔐', ttl: sec2Title, desc: t('sec_2_desc')},
      {key: '3', icon: '🔗', ttl: t('sec_3_title'), desc: t('sec_3_desc')},
      {key: '4', icon: '⚖️', ttl: t('sec_4_title'), desc: t('sec_4_desc')}
    ];
    return (
      <div className="sec-frame deck-dot-grid">
        <div className="sec-head">
          <p className="deck-eyebrow">{eyebrow(index, t('sec_label'))}</p>
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
          @media (max-width: 640px) {
            .sec-frame {
              height: auto;
              gap: 16px;
            }
            .sec-head {
              gap: 4px;
            }
            .sec-kicker {
              font-size: 16px;
              margin-bottom: 2px;
            }
            .sec-title {
              font-size: clamp(22px, 6.5vw, 28px);
              line-height: 1.18;
            }
            .sec-grid {
              gap: 10px;
            }
            .sec-card {
              padding: 14px;
              gap: 10px;
              border-radius: var(--mp-radius-md);
            }
            .sec-icon {
              width: 38px;
              height: 38px;
              font-size: 20px;
              border-radius: 10px;
            }
            .sec-card h3 {
              font-size: 15px;
            }
            .sec-card p {
              font-size: 13px;
              line-height: 1.45;
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
  Body: ({client, index}: SlideContext) => {
    const {t} = useI18n();
    const isRegulator = client.kind === 'regulator';
    const fillClient = (s: string) => s.replaceAll('{client}', client.name);
    const title = isRegulator
      ? t('ben_title_regulator')
      : fillClient(t('ben_title'));
    const items = [
      {icon: '👑', ttl: t('ben_1_title'), desc: t('ben_1_desc')},
      {icon: '🚀', ttl: t('ben_2_title'), desc: t('ben_2_desc')},
      {icon: '⚡', ttl: t('ben_3_title'), desc: t('ben_3_desc')},
      {icon: '🧠', ttl: t('ben_4_title'), desc: t('ben_4_desc')}
    ];
    return (
      <div className="ben-frame">
        <div className="ben-head">
          <p className="deck-eyebrow">{eyebrow(index, t('ben_label'))}</p>
          <p className="deck-kicker">{t('ben_kicker')}</p>
          <h1 className="deck-title-1">{title}</h1>
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
          @media (max-width: 640px) {
            .ben-frame {
              gap: 16px;
            }
            .ben-grid {
              gap: 10px;
            }
            .ben-card {
              gap: 12px;
              padding: 14px;
              border-radius: var(--mp-radius-md);
              align-items: flex-start;
            }
            .ben-icon {
              width: 40px;
              height: 40px;
              font-size: 22px;
              border-radius: 10px;
            }
            .ben-body h3 {
              font-size: 15px;
              margin-bottom: 4px;
            }
            .ben-body p {
              font-size: 13px;
              line-height: 1.45;
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
  Body: ({index}) => {
    const {t} = useI18n();
    return (
      <div className="impl-frame">
        <div className="impl-top">
          <div className="impl-head">
            <p className="deck-eyebrow">{eyebrow(index, t('impl_label'))}</p>
            <p className="deck-kicker">{t('impl_kicker')}</p>
            <h1 className="deck-title-1 impl-title">{t('impl_title')}</h1>
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
        </div>
        <div className="impl-services">
          <h3>{t('impl_services_title')}</h3>
          <div className="services-grid">
            <ServiceCard
              num={1}
              label={t('impl_service1')}
              desc={t('impl_service1_desc')}
              method="POST"
              path="/login"
            />
            <ServiceCard
              num={2}
              label={t('impl_service2')}
              desc={t('impl_service2_desc')}
              method="POST"
              path="/authorize"
            />
            <ServiceCard
              num={3}
              label={t('impl_service3')}
              desc={t('impl_service3_desc')}
              method="POST"
              path="/claim"
            />
          </div>
        </div>
        <div className="impl-data">
          <div className="impl-data-head">
            <div>
              <h3>{t('impl_data_title')}</h3>
              <p className="impl-data-sub">{t('impl_data_subtitle')}</p>
            </div>
            <span className="impl-data-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              No-custodial
            </span>
          </div>
          <div className="code-window">
            <div className="cw-titlebar">
              <span className="cw-dots">
                <span className="cw-dot" style={{background: '#FF5F57'}} />
                <span className="cw-dot" style={{background: '#FEBC2E'}} />
                <span className="cw-dot" style={{background: '#28C840'}} />
              </span>
              <span className="cw-filename">magic.user.ts</span>
            </div>
            <pre className="cw-body">
              <code>
                <span className="ln">1</span><span className="kw">type</span> <span className="ty">User</span> = {'{'}{'\n'}
                <span className="ln">2</span>  <span className="prop">userId</span><span className="punct">:</span>    <span className="ty">string</span><span className="punct">;</span>  <span className="cm">{'// '}{t('impl_data_code_user_comment')}</span>{'\n'}
                <span className="ln">3</span>  <span className="prop">accountId</span><span className="punct">:</span> <span className="ty">string</span><span className="punct">;</span>  <span className="cm">{'// '}{t('impl_data_code_account_comment')}</span>{'\n'}
                <span className="ln">4</span>  <span className="prop">alias</span><span className="punct">:</span>     <span className="ty">string</span><span className="punct">;</span>  <span className="cm">{'// '}{t('impl_data_code_alias_comment')}</span>{'\n'}
                <span className="ln">5</span>{'}'}<span className="punct">;</span>{'\n'}
                <span className="ln">6</span>{'\n'}
                <span className="ln">7</span><span className="cm">{t('impl_data_code_never_label')}</span>{'\n'}
                <span className="ln">8</span><span className="cm">{'// '}{t('impl_data_code_never_list')}</span>
              </code>
            </pre>
          </div>
          <div className="impl-data-note">{t('impl_data_note')}</div>
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
            padding: clamp(28px, 3.5vh, 56px) var(--pad-x)
              clamp(20px, 2.5vh, 36px);
            display: flex;
            flex-direction: column;
            gap: clamp(14px, 2vh, 24px);
          }
          .impl-top {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            align-items: end;
            gap: clamp(20px, 4vw, 60px);
          }
          .impl-title {
            font-size: clamp(28px, 3.4vw, 48px) !important;
            line-height: 1.05 !important;
            margin: 0 !important;
          }
          .impl-top :global(.deck-kicker) {
            margin: 0 0 4px;
            font-size: clamp(16px, 1.4vw, 22px);
          }
          .impl-top :global(.deck-eyebrow) {
            margin: 0 0 2px;
          }
          .impl-stats {
            display: flex;
            gap: clamp(20px, 2.6vw, 40px);
            align-items: flex-end;
            flex-shrink: 0;
          }
          .impl-stat {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .impl-stat .num {
            font: 500 clamp(36px, 4.4vw, 64px) / 0.95 var(--mp-font-display);
            letter-spacing: -0.03em;
            color: var(--mp-ink);
          }
          .impl-stat .lbl {
            font: 400 clamp(12px, 1vw, 15px) / 1.3 var(--mp-font-body);
            color: var(--mp-fg-muted);
          }
          .impl-services h3 {
            font: 500 clamp(15px, 1.3vw, 20px) / 1.2 var(--mp-font-display);
            margin: 0 0 10px;
          }
          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .impl-data {
            background: var(--mp-grey);
            border: 1px solid var(--mp-border-soft);
            border-radius: var(--mp-radius-lg);
            padding: clamp(14px, 1.8vw, 22px);
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .impl-data-head {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 16px;
          }
          .impl-data h3 {
            font: 500 clamp(15px, 1.3vw, 19px) / 1.2 var(--mp-font-display);
            margin: 0;
          }
          .impl-data-sub {
            font: 400 clamp(12px, 1vw, 14px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            margin: 3px 0 0;
            max-width: 720px;
          }
          .impl-data-badge {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: color-mix(in srgb, var(--brand) 12%, var(--mp-white));
            color: var(--brand);
            border-radius: var(--mp-radius-pill);
            font: 500 12px/1 var(--mp-font-body);
            border: 1px solid color-mix(in srgb, var(--brand) 25%, transparent);
          }
          .code-window {
            background: #1e1e2e;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.06);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18),
              0 2px 6px rgba(0, 0, 0, 0.08);
          }
          .cw-titlebar {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 7px 12px;
            background: #181825;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
          .cw-dots {
            display: inline-flex;
            gap: 5px;
          }
          .cw-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            display: inline-block;
          }
          .cw-filename {
            font: 500 11px/1 ui-monospace, 'SF Mono', Menlo, monospace;
            color: rgba(205, 214, 244, 0.6);
            margin-left: 4px;
          }
          .cw-body {
            margin: 0;
            padding: 12px 18px 14px;
            font: 400 clamp(11px, 0.9vw, 13px) / 1.6 ui-monospace, 'SF Mono',
              Menlo, monospace;
            color: #cdd6f4;
            background: #1e1e2e;
            white-space: pre;
            overflow-x: auto;
          }
          .cw-body :global(.ln) {
            display: inline-block;
            width: 2.2em;
            color: rgba(205, 214, 244, 0.25);
            user-select: none;
            text-align: right;
            padding-right: 1.2em;
          }
          .cw-body :global(.kw) {
            color: #cba6f7;
          }
          .cw-body :global(.ty) {
            color: #f9e2af;
          }
          .cw-body :global(.prop) {
            color: #89dceb;
          }
          .cw-body :global(.punct) {
            color: rgba(205, 214, 244, 0.6);
          }
          .cw-body :global(.cm) {
            color: #6c7086;
            font-style: italic;
          }
          .impl-data-note {
            font: 400 clamp(11px, 0.9vw, 13px) / 1.4 var(--mp-font-body);
            color: var(--mp-fg-muted);
            padding-top: 6px;
            border-top: 1px solid var(--mp-border-soft);
          }
          .impl-foot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 24px;
            flex-wrap: wrap;
          }
          .impl-no-mig {
            font: 400 clamp(12px, 1vw, 15px) / 1.4 var(--mp-font-body);
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
          @media (max-width: 640px) {
            .impl-frame {
              padding: 18px 18px 28px;
              gap: 16px;
            }
            .impl-top {
              grid-template-columns: 1fr;
              gap: 14px;
            }
            .impl-top :global(.deck-kicker) {
              font-size: 16px;
            }
            .impl-title {
              font-size: clamp(22px, 6.5vw, 28px) !important;
            }
            .impl-stats {
              gap: 24px;
            }
            .impl-stat .num {
              font-size: clamp(32px, 10vw, 44px);
            }
            .impl-stat .lbl {
              font-size: 12px;
            }
            .impl-data {
              padding: 14px;
              border-radius: var(--mp-radius-md);
            }
            .impl-data-head {
              gap: 10px;
              flex-direction: column;
            }
            .impl-data-badge {
              align-self: flex-start;
            }
            .cw-body {
              font-size: 11px;
              padding: 10px 14px 12px;
            }
            .impl-foot {
              flex-direction: column;
              align-items: stretch;
              gap: 12px;
            }
            .docs-cta {
              justify-content: center;
              padding: 14px 20px;
              font-size: 14px;
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
  desc,
  method,
  path
}: {
  num: number;
  desc?: string;
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
        {desc && <div className="svc-desc">{desc}</div>}
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
        .svc-desc {
          margin-top: 4px;
          font: 400 12px/1.4 var(--mp-font-body);
          color: var(--mp-fg-muted);
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
  Body: ({index}) => {
    const {t} = useI18n();
    const bullets = [t('reg_1'), t('reg_2'), t('reg_3'), t('reg_4'), t('reg_5'), t('reg_6')];
    return (
      <div className="reg-frame">
        <div className="reg-head">
          <p className="deck-eyebrow">{eyebrow(index, t('reg_label'))}</p>
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
          @media (max-width: 640px) {
            .reg-frame {
              gap: 16px;
            }
            .reg-list {
              gap: 8px;
            }
            .reg-list li {
              padding: 12px 14px;
              gap: 12px;
              border-radius: var(--mp-radius-md);
            }
            .reg-num {
              font-size: 18px;
            }
            .reg-text {
              font-size: 13px;
              line-height: 1.45;
            }
          }
        `}</style>
      </div>
    );
  }
};
