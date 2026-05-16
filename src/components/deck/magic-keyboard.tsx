'use client';

// MagicKeyboard — pixel-aligned with /docs#customization preview.
// Color is driven by the `color` prop (defaults to var(--brand)).
// Theme: light or dark, matching the dashboard preview.

export function MagicKeyboard({
  amount = '0',
  color,
  onPrimary,
  theme = 'light',
  showImessageBar = true,
  showNameBar = true,
  recipientName = 'Jonathan Moore',
  recipientSub = 'Main Account',
  keysSlot
}: {
  amount?: string;
  color?: string;
  onPrimary?: string;
  theme?: 'light' | 'dark';
  showImessageBar?: boolean;
  showNameBar?: boolean;
  recipientName?: string;
  recipientSub?: string;
  /** When provided, replaces the numeric keys grid + Send button while
   *  keeping the toolbar (back/dock/$/MXN) and the bottom bar (globe,
   *  mic) intact. Use for in-keyboard loading or success states that
   *  should preserve the keyboard's exact proportions. */
  keysSlot?: React.ReactNode;
}) {
  const accent = color ?? 'var(--brand)';
  const onAccent = onPrimary ?? '#FFFFFF';
  return (
    <div
      className={`kb-preview kb-${theme}`}
      style={
        {
          ['--kb-primary' as string]: accent,
          ['--kb-on-primary' as string]: onAccent
        } as React.CSSProperties
      }
    >
      {showImessageBar && (
        <div className="kb-imessage-bar">
          <span className="kb-imessage-plus">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="kb-imessage-field">Message…</span>
          <svg className="kb-imessage-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </div>
      )}

      {showNameBar && (
        <div className="kb-name-bar">
          <span className="kb-name">{recipientName}</span>
          <span className="kb-name-sub">{recipientSub}</span>
        </div>
      )}

      <div className="kb-body">
        <div className="kb-toolbar">
          <svg className="kb-tool kb-tool-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="kb-tool kb-tool-dock" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="1" width="18" height="12" rx="2" />
            <line x1="5" y1="4" x2="5.01" y2="4" />
            <line x1="10" y1="4" x2="10.01" y2="4" />
            <line x1="15" y1="4" x2="15.01" y2="4" />
            <line x1="5" y1="7" x2="5.01" y2="7" />
            <line x1="10" y1="7" x2="10.01" y2="7" />
            <line x1="15" y1="7" x2="15.01" y2="7" />
            <line x1="7" y1="10" x2="13" y2="10" />
          </svg>
          <div className="kb-amount-pill">
            <span>${amount}</span>
          </div>
          <div className="kb-currency">
            <span>MXN</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
        {keysSlot ? (
          /* Same vertical footprint as the keys grid (4 × 30px + 3 × 4px gap
             = 132) + send (4 + 32) so swapping content keeps the keyboard
             the exact same height. */
          <div className="kb-keys-slot">{keysSlot}</div>
        ) : (
          <>
        <div className="kb-keys">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map((k) => (
            <div className="kb-key" key={k}>
              {k}
            </div>
          ))}
          <div className="kb-key kb-key-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.374-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33z" />
            </svg>
          </div>
        </div>
        <div className="kb-send">
          <svg viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.2" />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Send
        </div>
          </>
        )}
        <div className="kb-bottom-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          <svg viewBox="0 0 24 34" fill="currentColor">
            <path d="M12 1a5 5 0 015 5v10a5 5 0 01-10 0V6a5 5 0 015-5zM4 14v2a8 8 0 0016 0v-2h2v2a10 10 0 01-9 9.95V30h5v2H6v-2h5v-4.05A10 10 0 012 16v-2h2z" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .kb-preview {
          position: relative;
          z-index: 2;
          margin: 0 auto;
          width: 100%;
          max-width: 260px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          font-family: -apple-system, 'SF Pro', 'SF Compact', system-ui, sans-serif;
          user-select: none;
        }
        .kb-imessage-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          background: #fff;
        }
        .kb-imessage-plus {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #f3f4f6;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .kb-imessage-plus :global(svg) {
          width: 12px;
          height: 12px;
          color: #9ca3af;
        }
        .kb-imessage-field {
          flex: 1;
          height: 26px;
          border-radius: 999px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          padding: 0 10px;
          font-size: 10px;
          color: #9ca3af;
        }
        .kb-imessage-mic {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          color: #6b7280;
        }
        .kb-name-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 14px;
          border-top: 1px solid #f3f4f6;
        }
        .kb-name {
          font-size: 9px;
          font-weight: 600;
          color: rgba(32, 35, 41, 0.6);
        }
        .kb-name-sub {
          font-size: 8px;
          font-weight: 600;
          color: rgba(32, 35, 41, 0.6);
        }
        .kb-body {
          background: #f2f2f2;
          border-radius: 18px 18px 0 0;
          padding-bottom: 14px;
        }
        .kb-toolbar {
          position: relative;
          height: 44px;
          margin: 0 4px;
        }
        .kb-tool {
          position: absolute;
          top: 14px;
          color: #202329;
        }
        .kb-tool-back {
          left: 7px;
          width: 11px;
          height: 11px;
        }
        .kb-tool-dock {
          left: 22px;
          width: 16px;
          height: 11px;
        }
        .kb-amount-pill {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          padding: 5px 7px;
          border-radius: 5px;
          background: rgba(250, 250, 250, 0.7);
          border: 1px solid #fff;
          box-shadow: 0 2px 42px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(12px);
        }
        .kb-amount-pill span {
          font-size: 20px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          color: var(--kb-primary);
        }
        .kb-currency {
          position: absolute;
          right: 5px;
          top: 12px;
          display: flex;
          align-items: center;
          gap: 1px;
          color: #202329;
        }
        .kb-currency span {
          font-size: 10px;
          font-weight: 600;
        }
        .kb-currency :global(svg) {
          width: 8px;
          height: 8px;
        }
        .kb-keys {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          margin: 1px 4px 0;
        }
        /* Replacement slot: occupies the exact same vertical space as
           the keys grid + Send button (4 × 30px + 3 × 4px gap + 1px
           margin + 4px send-margin + 32px send = 172px) so swapping
           content keeps the keyboard's total height stable. */
        .kb-keys-slot {
          margin: 1px 4px 0;
          height: 167px;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .kb-key {
          height: 30px;
          border-radius: 6px;
          background: #fff;
          color: #202329;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 400;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
        }
        .kb-key-icon :global(svg) {
          width: 14px;
          height: 14px;
          color: #202329;
        }
        .kb-send {
          margin: 4px 5px 0;
          height: 32px;
          border-radius: 8px;
          background: var(--kb-primary);
          color: var(--kb-on-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
        }
        .kb-send :global(svg) {
          width: 11px;
          height: 11px;
        }
        .kb-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 8px 20px 0;
          color: #6f7592;
        }
        .kb-bottom-bar :global(svg:first-child) {
          width: 16px;
          height: 16px;
        }
        .kb-bottom-bar :global(svg:last-child) {
          width: 13px;
          height: 18px;
          fill: #6f7592;
        }
        /* Dark theme — matches /docs */
        .kb-dark {
          background: #1c1c1e;
          border-color: rgba(255, 255, 255, 0.08);
        }
        .kb-dark .kb-imessage-bar {
          background: #1c1c1e;
        }
        .kb-dark .kb-imessage-plus,
        .kb-dark .kb-imessage-field {
          background: #3a3a3c;
        }
        .kb-dark .kb-imessage-field {
          color: #6b7280;
        }
        .kb-dark .kb-name-bar {
          border-top-color: #3a3a3c;
        }
        .kb-dark .kb-name,
        .kb-dark .kb-name-sub {
          color: rgba(255, 255, 255, 0.6);
        }
        .kb-dark .kb-body {
          background: #2c2c2e;
        }
        .kb-dark .kb-key {
          background: #5a5a5e;
          color: #fff;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
        }
        .kb-dark .kb-key-icon :global(svg) {
          color: #fff;
        }
        .kb-dark .kb-tool {
          color: #fff;
        }
        .kb-dark .kb-amount-pill {
          background: rgba(60, 60, 67, 0.6);
          border-color: rgba(255, 255, 255, 0.08);
        }
        .kb-dark .kb-currency {
          color: #fff;
        }
        .kb-dark .kb-bottom-bar :global(svg) {
          color: rgba(255, 255, 255, 0.6);
        }
        .kb-dark .kb-bottom-bar :global(svg:last-child) {
          fill: rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}
