'use client';

// Interactive claim flow — replicates the magicpay_web_claim "Cobrar transferencia"
// UI inside an iPhone frame. Two modes: "1ra vez" (full form) and "2da vez" (saved
// account already shown). CLABE/Tarjeta vs DIMO (próximamente). Uses var(--brand)
// so colors automatically follow the client's brand_color.

import {useState} from 'react';

type Mode = 'first' | 'returning';
type Method = 'clabe' | 'dimo';

export function ClaimDemo({brand: _brand}: {brand: string}) {
  const [mode, setMode] = useState<Mode>('first');

  return (
    <div className="claim-stage">
      <div className="claim-toggle" role="group" aria-label="Visit type">
        <button
          className={mode === 'first' ? 'active' : ''}
          onClick={() => setMode('first')}
        >
          1ra vez
        </button>
        <button
          className={mode === 'returning' ? 'active' : ''}
          onClick={() => setMode('returning')}
        >
          2da vez
        </button>
      </div>

      <div className="claim-phone">
        <div className="deck-phone">
          <div className="deck-phone-notch" />
          <div className="deck-phone-screen claim-screen">
            {mode === 'first' ? <FirstTimeClaim /> : <ReturningClaim />}
          </div>
        </div>
      </div>

      <style jsx>{`
        .claim-stage {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          min-height: 0;
        }
        .claim-toggle {
          display: inline-flex;
          background: var(--mp-grey);
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-pill);
          padding: 3px;
          gap: 2px;
          flex-shrink: 0;
        }
        .claim-toggle button {
          background: transparent;
          border: 0;
          padding: 6px 16px;
          border-radius: var(--mp-radius-pill);
          font: 500 13px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          cursor: pointer;
          transition: all 180ms;
        }
        .claim-toggle button.active {
          background: var(--brand);
          color: #fff;
        }
        .claim-phone {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .claim-phone :global(.deck-phone) {
          height: 100%;
          width: auto;
          aspect-ratio: 9 / 19.5;
          max-height: 100%;
        }
        .claim-screen {
          background: #fff;
          overflow-y: auto;
          font-family: var(--mp-font-ios);
          color: #1a1a1a;
        }
        .claim-screen::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

// ---------- 1ra vez (first time) ----------

function FirstTimeClaim() {
  const [method, setMethod] = useState<Method>('clabe');
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const isClabeValid = account.replace(/\s/g, '').length >= 16;
  const isPhoneValid = phone.replace(/\D/g, '').length === 10;
  const canClaim =
    (method === 'clabe' && isClabeValid && name.trim().length > 2) ||
    (method === 'dimo' && isPhoneValid);

  return (
    <div className="ft">
      <div className="ft-statusbar">
        <span>9:41</span>
        <span className="ft-icons">●●●●● 5G</span>
      </div>
      <div className="ft-pad">
        <header className="ft-head">
          <div className="ft-title-block">
            <h1>Cobrar transferencia</h1>
            <p>Usa tu CLABE o tarjeta para recibir este pago.</p>
          </div>
          <span className="ft-badge">Pendiente</span>
        </header>

        <div className="ft-summary">
          <div className="ft-amount">
            $150<span className="cents">.00</span>
          </div>
          <div className="ft-rows">
            <Row k="Concepto" v={<><span aria-hidden>🍽️</span> Comida</>} />
            <Row k="De" v="Bruno A. R. B." />
            <Row k="Creada" v="12 nov 2025, 02:33 p. m." />
            <Row k="Expira" v="13 nov 2025, 02:33 p. m." />
          </div>
        </div>

        <div className="ft-tabs">
          <button
            className={`ft-tab ${method === 'clabe' ? 'active' : ''}`}
            onClick={() => setMethod('clabe')}
          >
            <span aria-hidden>🏦</span> CLABE/Tarjeta
          </button>
          <button
            className={`ft-tab ${method === 'dimo' ? 'active' : ''}`}
            onClick={() => setMethod('dimo')}
          >
            <span className="dimo-icon" aria-hidden>
              <span className="dimo-letter">D</span>
            </span>
            Dimo®
          </button>
        </div>

        {method === 'clabe' ? (
          <>
            <div className="ft-field">
              <label>Cuenta destino</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="CLABE (18) o Tarjeta (16)"
                value={account}
                onChange={(e) => setAccount(e.target.value.replace(/[^0-9 ]/g, ''))}
                maxLength={20}
              />
            </div>
            {isClabeValid && (
              <div className="ft-field">
                <label>Nombre completo del titular</label>
                <input
                  type="text"
                  placeholder="Como aparece en tu cuenta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="ft-field">
              <label>Número de teléfono</label>
              <input
                type="tel"
                inputMode="tel"
                placeholder="10 dígitos"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={10}
              />
            </div>
            {isPhoneValid && (
              <div className="dimo-card">
                <div className="dimo-card-head">
                  <span className="dimo-icon" aria-hidden>
                    <span className="dimo-letter">D</span>
                  </span>
                  <span>Información Dimo®</span>
                </div>
                <div className="dimo-card-rows">
                  <div className="dimo-card-row">
                    <span className="k">Nombre</span>
                    <span className="v">Bruno Ramos B.</span>
                  </div>
                  <div className="dimo-card-row">
                    <span className="k">Cuenta</span>
                    <span className="v">****0163</span>
                  </div>
                  <div className="dimo-card-row">
                    <span className="k">Banco</span>
                    <span className="v">ARCUS FI</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <button className="ft-claim" disabled={!canClaim}>
          Reclamar pago
        </button>
      </div>

      <style jsx>{`
        .ft {
          display: flex;
          flex-direction: column;
          height: 100%;
          font-size: 13px;
        }
        .ft-statusbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px 6px;
          font: 500 12px/1 var(--mp-font-ios);
          color: #111;
          background: #fff;
        }
        .ft-icons {
          font-size: 9px;
          letter-spacing: 1px;
        }
        .ft-pad {
          flex: 1;
          padding: 12px 14px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ft-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }
        .ft-title-block h1 {
          font: 500 17px/1.2 var(--mp-font-ios);
          margin: 0;
          color: #111;
        }
        .ft-title-block p {
          font: 400 12px/1.4 var(--mp-font-ios);
          color: #777;
          margin: 4px 0 0;
        }
        .ft-badge {
          background: #fdecc8;
          color: #c2772a;
          font: 500 11px/1 var(--mp-font-ios);
          padding: 4px 10px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .ft-summary {
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 14px;
          padding: 14px;
        }
        .ft-amount {
          font: 700 26px/1 var(--mp-font-ios);
          color: #111;
          text-align: right;
          margin-bottom: 10px;
        }
        .ft-amount .cents {
          font-size: 18px;
        }
        .ft-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ft-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 10px;
        }
        .ft-tab {
          background: transparent;
          border: 0;
          padding: 8px 10px;
          border-radius: 8px;
          font: 500 12px/1.2 var(--mp-font-ios);
          color: #555;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          position: relative;
        }
        .ft-tab.active {
          background: #fff;
          color: #111;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .dimo-icon {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #4ade80, #22c55e);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .dimo-letter {
          color: #fff;
          font-size: 9px;
          font-weight: 700;
        }
        .dimo-card {
          background: #f8f8f8;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          border: 1px solid #e5e5e5;
        }
        .dimo-card-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font: 500 12px/1 var(--mp-font-ios);
          color: #111;
        }
        .dimo-card-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dimo-card-row {
          display: flex;
          justify-content: space-between;
          font: 400 12px/1.3 var(--mp-font-ios);
        }
        .dimo-card-row .k {
          color: #888;
        }
        .dimo-card-row .v {
          color: #111;
          font-weight: 500;
        }
        .ft-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ft-field label {
          font: 500 11px/1 var(--mp-font-ios);
          color: #444;
        }
        .ft-field input {
          background: #f8f8f8;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          padding: 11px 12px;
          font: 400 13px/1 var(--mp-font-ios);
          color: #111;
          outline: none;
          transition: border-color 120ms;
        }
        .ft-field input:focus {
          border-color: var(--brand);
          background: #fff;
        }
        .ft-field input::placeholder {
          color: #999;
        }
        .dimo-empty {
          padding: 24px 12px;
          text-align: center;
          background: #f8f8f8;
          border-radius: 10px;
        }
        .dimo-empty p {
          font: 500 13px/1 var(--mp-font-ios);
          color: #555;
          margin: 0 0 4px;
        }
        .dimo-empty small {
          font: 400 11px/1.3 var(--mp-font-ios);
          color: #999;
        }
        .ft-claim {
          background: #e8e8e8;
          color: #999;
          border: 0;
          padding: 12px;
          border-radius: 10px;
          font: 500 14px/1 var(--mp-font-ios);
          margin-top: auto;
          cursor: not-allowed;
          transition: all 180ms;
        }
        .ft-claim:not(:disabled) {
          background: var(--brand);
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

function Row({k, v}: {k: string; v: React.ReactNode}) {
  return (
    <div className="row">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      <style jsx>{`
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font: 400 12px/1.3 var(--mp-font-ios);
        }
        .k {
          color: #888;
        }
        .v {
          color: #111;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}

// ---------- 2da vez (returning) ----------

function ReturningClaim() {
  return (
    <div className="rc">
      <div className="ft-statusbar">
        <span>9:41</span>
        <span className="ft-icons">●●●●● 5G</span>
      </div>
      <div className="rc-pad">
        <div className="rc-icon" style={{background: 'var(--brand)'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/logos/icon.svg" alt="" aria-hidden />
        </div>
        <h2 className="rc-name" style={{color: 'var(--brand)'}}>
          Bruno A. R. B.
        </h2>
        <p className="rc-sub">te envió un pago por:</p>
        <div className="rc-amount" style={{color: 'var(--brand)'}}>
          $150.00
        </div>
        <p className="rc-instr">
          El dinero se enviará a tu cuenta utilizada anteriormente:
        </p>
        <div className="rc-card" style={{borderColor: 'var(--brand)'}}>
          <div className="rc-card-icon" aria-hidden>
            💳
          </div>
          <div>
            <div className="rc-card-num">706************0163</div>
            <div className="rc-card-bank">ARCUS FI</div>
            <div className="rc-card-name">Bruno Ramos Berho</div>
          </div>
        </div>
        <button className="rc-primary" style={{background: 'var(--brand)'}}>
          Reclamar Pago
        </button>
        <button className="rc-secondary">Usar Cuenta Diferente</button>
      </div>

      <style jsx>{`
        .rc {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #fff;
        }
        .ft-statusbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 22px 6px;
          font: 500 12px/1 var(--mp-font-ios);
          color: #111;
        }
        .ft-icons {
          font-size: 9px;
          letter-spacing: 1px;
        }
        .rc-pad {
          flex: 1;
          padding: 16px 14px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
        }
        .rc-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }
        .rc-icon :global(img) {
          width: 32px;
          height: 32px;
          filter: brightness(0) invert(1);
        }
        .rc-name {
          font: 600 18px/1.1 var(--mp-font-ios);
          margin: 8px 0 0;
        }
        .rc-sub {
          font: 400 13px/1 var(--mp-font-ios);
          color: #666;
          margin: 4px 0 0;
        }
        .rc-amount {
          font: 700 36px/1 var(--mp-font-ios);
          letter-spacing: -0.02em;
          margin: 6px 0 12px;
          padding: 12px 24px;
          background: rgba(0, 0, 0, 0.02);
          border-radius: 14px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .rc-instr {
          font: 500 12px/1.4 var(--mp-font-ios);
          color: #1a1a1a;
          margin: 8px 0 6px;
          padding: 0 6px;
        }
        .rc-card {
          width: 100%;
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 10px;
          padding: 12px;
          border: 2px solid;
          border-radius: 14px;
          align-items: center;
          text-align: left;
        }
        .rc-card-icon {
          width: 56px;
          height: 38px;
          background: linear-gradient(135deg, #f5d76b, #d4a536);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .rc-card-num {
          font: 500 13px/1 ui-monospace, 'SF Mono', Menlo, monospace;
          color: #111;
        }
        .rc-card-bank {
          font: 500 12px/1 var(--mp-font-ios);
          color: #444;
          margin-top: 4px;
        }
        .rc-card-name {
          font: 500 12px/1 var(--mp-font-ios);
          color: #111;
          margin-top: 4px;
        }
        .rc-primary {
          margin-top: 10px;
          width: 100%;
          color: #fff;
          border: 0;
          padding: 12px;
          border-radius: 10px;
          font: 500 14px/1 var(--mp-font-ios);
          cursor: pointer;
        }
        .rc-secondary {
          width: 100%;
          background: #2c2f3a;
          color: #fff;
          border: 0;
          padding: 12px;
          border-radius: 10px;
          font: 500 14px/1 var(--mp-font-ios);
          cursor: pointer;
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
