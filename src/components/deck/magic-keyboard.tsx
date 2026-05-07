'use client';

// MagicKeyboard — replicates the magic numeric pay keyboard from the landing's
// /docs#customization animation. Color is driven by the `color` prop (defaults
// to var(--brand)) so it adapts to the client brand or to the white-label demo.

export function MagicKeyboard({
  amount = '0',
  color,
  size = 'md',
  theme = 'light'
}: {
  amount?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}) {
  const accent = color ?? 'var(--brand)';
  return (
    <div
      className={`mk-root mk-${size} mk-${theme}`}
      style={{['--mk-accent' as string]: accent}}
    >
      <div className="mk-bar">
        <button className="mk-back" aria-label="Back">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M3 8h18M6 8l-3 4 3 4M3 12h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="mk-amount">
          <span className="mk-amount-symbol">$</span>
          <span className="mk-amount-num">{amount}</span>
        </div>
        <button className="mk-currency" aria-label="Currency">
          MXN <span className="mk-chevron">▾</span>
        </button>
      </div>
      <div className="mk-grid">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((k) => (
          <button key={k} className="mk-key">
            {k}
          </button>
        ))}
        <button className="mk-key mk-del" aria-label="Delete">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-7-7 7-7zM18 9l-6 6m0-6l6 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <button className="mk-send">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deck/logos/icon.svg" alt="" aria-hidden className="mk-send-icon" />
        <span>Send</span>
      </button>
      <style jsx>{`
        .mk-root {
          --mk-bg: #f3f4f6;
          --mk-key-bg: #ffffff;
          --mk-fg: #111;
          --mk-muted: #777;
          width: 100%;
          background: var(--mk-bg);
          padding: 12px;
          border-radius: 14px;
          display: grid;
          gap: 8px;
          font-family: var(--mp-font-ios);
          color: var(--mk-fg);
          transition: background 220ms var(--mp-ease), color 220ms var(--mp-ease);
        }
        .mk-dark {
          --mk-bg: #1e1e22;
          --mk-key-bg: #2a2a2f;
          --mk-fg: #fff;
          --mk-muted: #999;
        }
        .mk-bar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 8px;
        }
        .mk-back {
          background: var(--mk-key-bg);
          border: 0;
          width: 56px;
          height: 36px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--mk-fg);
          cursor: default;
        }
        .mk-back :global(svg) {
          width: 16px;
          height: 16px;
        }
        .mk-amount {
          background: var(--mk-key-bg);
          border-radius: 8px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--mk-accent);
          font-weight: 500;
          font-size: 18px;
          letter-spacing: -0.01em;
          gap: 1px;
        }
        .mk-currency {
          background: transparent;
          border: 0;
          color: var(--mk-fg);
          font: 500 13px/1 var(--mp-font-ios);
          padding: 0 10px;
          cursor: default;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .mk-chevron {
          font-size: 9px;
          opacity: 0.6;
        }
        .mk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .mk-key {
          background: var(--mk-key-bg);
          border: 0;
          height: 44px;
          border-radius: 8px;
          font: 500 18px/1 var(--mp-font-ios);
          color: var(--mk-fg);
          cursor: default;
        }
        .mk-key.mk-del {
          color: var(--mk-fg);
        }
        .mk-key.mk-del :global(svg) {
          width: 18px;
          height: 18px;
        }
        .mk-send {
          background: var(--mk-accent);
          color: #fff;
          border: 0;
          height: 44px;
          border-radius: 10px;
          font: 500 16px/1 var(--mp-font-body);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: default;
          margin-top: 4px;
          transition: background 320ms var(--mp-ease);
        }
        .mk-send-icon {
          width: 18px;
          height: 18px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 5px;
          padding: 2px;
        }
        /* size variants */
        .mk-sm {
          font-size: 13px;
        }
        .mk-sm .mk-key {
          height: 38px;
          font-size: 15px;
        }
        .mk-sm .mk-send {
          height: 38px;
          font-size: 14px;
        }
        .mk-lg .mk-key {
          height: 56px;
          font-size: 22px;
        }
        .mk-lg .mk-send {
          height: 56px;
          font-size: 18px;
        }
        .mk-lg .mk-amount {
          height: 44px;
          font-size: 22px;
        }
      `}</style>
    </div>
  );
}
