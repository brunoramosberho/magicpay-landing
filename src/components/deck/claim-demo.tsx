'use client';

// Interactive claim flow — replicates the magicpay_web_claim "Cobrar transferencia"
// UI inside an iPhone frame. Two modes: "1ra vez" (full form, auto-fills CLABE → name →
// switches to DIMO → fills phone → CODI lookup → auto-claims with loading state) and
// "2da vez" (saved account, single tap). User interactions cancel the autoplay.
// Uses var(--brand) so colors follow the client's brand_color.

import {useEffect, useRef, useState} from 'react';

type Mode = 'first' | 'returning';
type Method = 'clabe' | 'dimo';

export function ClaimDemo({
  brand: _brand,
  clientName,
  clientLogo,
  clientAppIcon
}: {
  brand: string;
  clientName?: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const [mode, setMode] = useState<Mode>('first');
  const userInteractedRef = useRef(false);
  const name = clientName ?? 'Stori';

  const switchMode = (m: Mode) => {
    userInteractedRef.current = true;
    setMode(m);
  };

  return (
    <div className="claim-stage">
      <div className="claim-toggle" role="group" aria-label="Visit type">
        <button
          className={mode === 'first' ? 'active' : ''}
          onClick={() => switchMode('first')}
        >
          1ra vez
        </button>
        <button
          className={mode === 'returning' ? 'active' : ''}
          onClick={() => switchMode('returning')}
        >
          2da vez
        </button>
      </div>

      <div className="claim-phone">
        <div className="deck-phone">
          <div className="deck-phone-notch" />
          <div className="deck-phone-screen claim-screen">
            {mode === 'first' ? (
              <FirstTimeClaim
                userInteractedRef={userInteractedRef}
                clientName={name}
                clientLogo={clientLogo}
                clientAppIcon={clientAppIcon}
              />
            ) : (
              <ReturningClaim
                clientName={name}
                clientLogo={clientLogo}
                clientAppIcon={clientAppIcon}
              />
            )}
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
          gap: 10px;
          min-height: 0;
          padding: 0;
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
          padding: 5px 14px;
          border-radius: var(--mp-radius-pill);
          font: 500 12px/1 var(--mp-font-body);
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
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .claim-phone :global(.deck-phone) {
          height: auto;
          width: auto;
          aspect-ratio: 9 / 19.5;
          max-height: 100%;
          max-width: min(330px, 100%);
          padding: 6px;
          border-radius: clamp(32px, 3.4vw, 50px);
        }
        .claim-phone :global(.deck-phone-screen) {
          border-radius: clamp(20px, 2.4vw, 36px);
        }
        .claim-phone :global(.deck-phone-notch) {
          width: 70px;
          height: 18px;
          top: 8px;
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

type CodiLookup = {
  nombreMask: string;
  cuentaBancaria: string;
  claveSpei: string;
} | null;

function ClientHeader({name, logo}: {name: string; logo?: string}) {
  return (
    <div className="ch">
      <div className="ch-pill">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="ch-logo" />
        ) : (
          <span className="ch-name">{name}</span>
        )}
        <span className="ch-sep" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/deck/logos/magic.svg" alt="magic" className="ch-magic" />
      </div>
      <style jsx>{`
        .ch {
          display: flex;
          justify-content: center;
          padding: 10px 14px 0;
        }
        .ch-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 999px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .ch-logo {
          height: 16px;
          width: auto;
          object-fit: contain;
        }
        .ch-name {
          font: 600 13px/1 var(--mp-font-ios);
          color: #111;
          letter-spacing: -0.01em;
        }
        .ch-sep {
          width: 1px;
          height: 14px;
          background: #d9d9d9;
        }
        .ch-magic {
          height: 14px;
          width: auto;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}

function FirstTimeClaim({
  userInteractedRef,
  clientName,
  clientLogo,
  clientAppIcon
}: {
  userInteractedRef: React.MutableRefObject<boolean>;
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const [method, setMethod] = useState<Method>('clabe');
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [codi, setCodi] = useState<CodiLookup>(null);
  const [codiLoading, setCodiLoading] = useState(false);
  const [codiError, setCodiError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const isClabeValid = account.replace(/\s/g, '').length >= 16;
  const isPhoneValid = phone.replace(/\D/g, '').length === 10;
  const canClaim =
    (method === 'clabe' && isClabeValid && name.trim().length > 2) ||
    (method === 'dimo' && codi !== null);

  const onUserInput = () => {
    userInteractedRef.current = true;
  };

  const triggerClaim = () => {
    if (!canClaim || claiming) return;
    setClaiming(true);
    setTimeout(() => {
      setClaiming(false);
      setClaimed(true);
    }, 1500);
  };

  // Auto-fill demo: CLABE → name → switch to DIMO → phone → auto-claim.
  // Cancels the moment the user interacts.
  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const stopped = () => cancelled || userInteractedRef.current;
    const typeInto = async (
      setter: (s: string) => void,
      text: string,
      delay: number
    ) => {
      for (let i = 1; i <= text.length; i++) {
        if (stopped()) return false;
        await sleep(delay);
        if (stopped()) return false;
        setter(text.slice(0, i));
      }
      return true;
    };

    (async () => {
      await sleep(900);
      if (stopped()) return;
      if (!(await typeInto(setAccount, '002180420000000123', 45))) return;
      await sleep(450);
      if (!(await typeInto(setName, 'Bruno Ramos Berho', 55))) return;
      await sleep(900);
      if (stopped()) return;
      setMethod('dimo');
      await sleep(500);
      if (!(await typeInto(setPhone, '5522544905', 90))) return;
      // CODI lookup runs via the existing useEffect — wait for it.
      await sleep(1800);
      if (stopped()) return;
      // Auto-trigger claim (only if codi resolved or fallback to clabe values).
      setClaiming(true);
      await sleep(1500);
      if (stopped()) {
        setClaiming(false);
        return;
      }
      setClaiming(false);
      setClaimed(true);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real CODI lookup via back4app — fires when phone reaches 10 digits.
  useEffect(() => {
    if (method !== 'dimo' || !isPhoneValid) {
      setCodi(null);
      setCodiError(null);
      return;
    }
    let cancelled = false;
    setCodiLoading(true);
    setCodiError(null);
    fetch('https://parseapi.back4app.com/functions/codiCelLookup', {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': 'A8iMfulQ9xWeVRJhV5iq721AJkvlorfa4KQ7Fqhw',
        'X-Parse-REST-API-Key': 'xRHrC1XK9QqDJFJqjMQhMnC0sGBmXCYxWWW5SFt1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({telefono: phone})
    })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d?.result?.cuentaBancaria) {
          setCodi({
            nombreMask: d.result.nombreMask,
            cuentaBancaria: d.result.cuentaBancaria,
            claveSpei: d.result.claveSpei
          });
        } else {
          setCodiError('Número no encontrado en CODI.');
        }
      })
      .catch(() => {
        if (!cancelled) setCodiError('Error consultando CODI.');
      })
      .finally(() => {
        if (!cancelled) setCodiLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [method, phone, isPhoneValid]);

  if (claimed) {
    const acctTail =
      method === 'clabe'
        ? account.replace(/\s/g, '').slice(-4)
        : codi?.cuentaBancaria.slice(-4) ?? '';
    const acctName =
      method === 'clabe' ? name : codi?.nombreMask ?? '';
    const acctBank = method === 'clabe' ? clientName : `CLAVE ${codi?.claveSpei ?? ''}`;
    return (
      <SuccessReceipt
        senderName="Bruno A. R. B."
        amount="150.00"
        accountTail={acctTail}
        accountName={acctName}
        accountBank={acctBank}
        clientName={clientName}
        clientLogo={clientLogo}
        clientAppIcon={clientAppIcon}
      />
    );
  }

  return (
    <div className="ft">
      <div className="ft-statusbar">
        <span>9:41</span>
        <span className="ft-icons">●●●●● 5G</span>
      </div>
      <ClientHeader name={clientName} logo={clientLogo} />
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
            onClick={() => {
              onUserInput();
              setMethod('clabe');
            }}
          >
            <span aria-hidden>🏦</span> CLABE/Tarjeta
          </button>
          <button
            className={`ft-tab ${method === 'dimo' ? 'active' : ''}`}
            onClick={() => {
              onUserInput();
              setMethod('dimo');
            }}
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
                onChange={(e) => {
                  onUserInput();
                  setAccount(e.target.value.replace(/[^0-9 ]/g, ''));
                }}
                maxLength={20}
              />
            </div>
            <div className="ft-field">
              <label>Nombre completo del titular</label>
              <input
                type="text"
                placeholder="Como aparece en tu cuenta"
                value={name}
                onChange={(e) => {
                  onUserInput();
                  setName(e.target.value);
                }}
              />
            </div>
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
                onChange={(e) => {
                  onUserInput();
                  setPhone(e.target.value.replace(/[^0-9]/g, ''));
                }}
                maxLength={10}
              />
            </div>
            {isPhoneValid && codiLoading && (
              <div className="dimo-card">
                <div className="dimo-card-head">
                  <span className="dimo-spinner" />
                  <span>Consultando CODI…</span>
                </div>
              </div>
            )}
            {isPhoneValid && !codiLoading && codiError && (
              <div className="dimo-error">{codiError}</div>
            )}
            {isPhoneValid && !codiLoading && codi && (
              <div className="dimo-card">
                <div className="dimo-card-head">
                  <span className="dimo-icon" aria-hidden>
                    <span className="dimo-letter">D</span>
                  </span>
                  <span>Información CODI®</span>
                </div>
                <div className="dimo-card-rows">
                  <div className="dimo-card-row">
                    <span className="k">Nombre</span>
                    <span className="v">{codi.nombreMask}</span>
                  </div>
                  <div className="dimo-card-row">
                    <span className="k">Cuenta</span>
                    <span className="v">
                      ****{codi.cuentaBancaria.slice(-4)}
                    </span>
                  </div>
                  <div className="dimo-card-row">
                    <span className="k">Banco</span>
                    <span className="v">CLAVE {codi.claveSpei}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <button
          className="ft-claim"
          disabled={!canClaim || claiming}
          onClick={() => {
            onUserInput();
            triggerClaim();
          }}
        >
          {claiming ? (
            <>
              <span className="ft-claim-spinner" aria-hidden />
              Procesando…
            </>
          ) : (
            'Reclamar pago'
          )}
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
          padding: 8px 18px 4px;
          font: 500 11px/1 var(--mp-font-ios);
          color: #111;
          background: #fff;
        }
        .ft-icons {
          font-size: 9px;
          letter-spacing: 1px;
        }
        .ft-pad {
          flex: 1;
          padding: 14px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 13px;
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
        .dimo-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #ccc;
          border-top-color: var(--brand);
          border-radius: 50%;
          animation: spin 700ms linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .dimo-error {
          padding: 10px 12px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          font: 500 12px/1.3 var(--mp-font-ios);
          color: #b91c1c;
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
          padding: 14px;
          border-radius: 12px;
          font: 600 14px/1 var(--mp-font-ios);
          margin-top: auto;
          cursor: not-allowed;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 180ms;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
        }
        .ft-claim:not(:disabled) {
          background: var(--brand);
          color: #fff;
          cursor: pointer;
          box-shadow: 0 4px 12px
            color-mix(in srgb, var(--brand) 30%, transparent);
        }
        .ft-claim-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 700ms linear infinite;
          display: inline-block;
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
// Saved-account claim screen → click Reclamar → loading → SuccessReceipt.

function ReturningClaim({
  clientName,
  clientLogo,
  clientAppIcon
}: {
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const triggerClaim = () => {
    if (claiming) return;
    setClaiming(true);
    setTimeout(() => {
      setClaiming(false);
      setClaimed(true);
    }, 1500);
  };

  if (claimed) {
    return (
      <SuccessReceipt
        senderName="Bruno A. R. B."
        amount="150.00"
        accountTail="0163"
        accountName="Bruno Ramos Berho"
        accountBank={clientName}
        clientName={clientName}
        clientLogo={clientLogo}
        clientAppIcon={clientAppIcon}
      />
    );
  }

  return (
    <SavedAccountClaim
      senderName="Bruno A. R. B."
      amount="150.00"
      accountTail="0163"
      accountName="Bruno Ramos Berho"
      accountBank={clientName}
      clientName={clientName}
      clientLogo={clientLogo}
      claiming={claiming}
      onClaim={triggerClaim}
    />
  );
}

// Pre-claim screen — shows saved account preview with a Reclamar button.
function SavedAccountClaim({
  senderName,
  amount,
  accountTail,
  accountName,
  accountBank,
  clientName,
  clientLogo,
  claiming,
  onClaim
}: {
  senderName: string;
  amount: string;
  accountTail: string;
  accountName: string;
  accountBank: string;
  clientName: string;
  clientLogo?: string;
  claiming: boolean;
  onClaim: () => void;
}) {
  return (
    <div className="rc">
      <div className="ft-statusbar">
        <span>9:41</span>
        <span className="ft-icons">●●●●● 5G</span>
      </div>
      <ClientHeader name={clientName} logo={clientLogo} />
      <div className="rc-pad">
        <div className="rc-icon" style={{background: 'var(--brand)'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/deck/logos/icon.svg" alt="" aria-hidden />
        </div>
        <h2 className="rc-name" style={{color: 'var(--brand)'}}>
          {senderName}
        </h2>
        <p className="rc-sub">te envió un pago por:</p>
        <div className="rc-amount" style={{color: 'var(--brand)'}}>
          ${amount}
        </div>
        <p className="rc-instr">
          El dinero se enviará a tu cuenta utilizada anteriormente:
        </p>
        <div className="rc-card" style={{borderColor: 'var(--brand)'}}>
          <div className="rc-card-icon" aria-hidden>
            💳
          </div>
          <div>
            <div className="rc-card-num">****************{accountTail}</div>
            <div className="rc-card-bank">{accountBank}</div>
            <div className="rc-card-name">{accountName}</div>
          </div>
        </div>
        <button
          className="rc-primary"
          style={{background: 'var(--brand)'}}
          disabled={claiming}
          onClick={onClaim}
        >
          {claiming ? (
            <>
              <span className="rc-spinner" aria-hidden />
              Procesando…
            </>
          ) : (
            'Reclamar Pago'
          )}
        </button>
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
          padding: 14px;
          border-radius: 12px;
          font: 600 14px/1 var(--mp-font-ios);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .rc-primary:disabled {
          cursor: not-allowed;
          opacity: 0.92;
        }
        .rc-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 700ms linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

// Success receipt — final post-claim screen with full transaction detail,
// acquisition banner with the bank logo + CTA, and magicPay footer.
function SuccessReceipt({
  senderName,
  amount,
  accountTail,
  accountName,
  accountBank,
  clientName,
  clientLogo,
  clientAppIcon
}: {
  senderName: string;
  amount: string;
  accountTail: string;
  accountName: string;
  accountBank: string;
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const now = new Date();
  const created = formatDateTime(new Date(now.getTime() - 60_000));
  const sent = formatDateTime(now);
  const trace = generateTraceCode();
  const [intAmount, decAmount] = (amount.includes('.')
    ? amount.split('.')
    : [amount, '00']);

  return (
    <div className="sr">
      <div className="ft-statusbar">
        <span>9:41</span>
        <span className="ft-icons">●●●●● 5G</span>
      </div>
      <ClientHeader name={clientName} logo={clientLogo} />
      <div className="sr-scroll">
        <div className="sr-card">
          <div className="sr-card-head">
            <div className="sr-card-title-block">
              <span className="sr-paid-pill">
                <svg viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pago enviado
              </span>
              <h1>Resumen transferencia</h1>
            </div>
            <div className="sr-amount">
              ${intAmount}
              <span className="cents">.{decAmount}</span>
            </div>
          </div>
          <div className="sr-rows">
            <SrRow k="De" v={senderName} />
            <SrRow k="Enviado a" v={accountName} />
            <SrRow k="Cuenta" v={`002***********${accountTail}`} />
            <SrRow k="Banco" v={accountBank} />
            <SrRow k="Concepto" v={<><span aria-hidden>🍽️</span> Comida</>} />
            <SrRow k="Fecha" v={sent} />
            <SrRow k="Clave de rastreo" v={<code className="sr-trace">{trace}</code>} />
          </div>
        </div>

        <div className="sr-acq" style={{background: 'var(--brand)'}}>
          <span className="sr-acq-eyebrow">Anuncio</span>
          <div className="sr-acq-row">
            {clientAppIcon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={clientAppIcon} alt="" className="sr-acq-app-icon" />
            ) : clientLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={clientLogo} alt="" className="sr-acq-logo" />
            ) : (
              <span className="sr-acq-mark">
                {clientName.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="sr-acq-text">
              <strong>¿Te gustó recibir dinero así?</strong>
              <p>Envía por WhatsApp con tu cuenta {clientName}.</p>
            </div>
          </div>
          <button className="sr-acq-cta" style={{color: 'var(--brand)'}}>
            Quiero mi cuenta — es gratis ✨
          </button>
        </div>

        <div className="sr-foot">
          <span>Aviso de privacidad · {clientName} · magicPay®</span>
        </div>
      </div>

      <style jsx>{`
        .sr {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f7f8fa;
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
        .sr-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 10px 12px 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sr-scroll::-webkit-scrollbar {
          display: none;
        }
        .sr-card {
          background: #fff;
          border: 1px solid #ececec;
          border-radius: 14px;
          padding: 12px 13px;
        }
        .sr-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 10px;
        }
        .sr-card-title-block {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }
        .sr-card-head h1 {
          font: 600 13px/1.15 var(--mp-font-ios);
          margin: 0;
          color: #111;
          letter-spacing: -0.01em;
        }
        .sr-paid-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #d8f5e3;
          color: #1e8a4a;
          font: 600 10px/1 var(--mp-font-ios);
          padding: 4px 9px 4px 7px;
          border-radius: 999px;
          width: fit-content;
        }
        .sr-paid-pill :global(svg) {
          width: 11px;
          height: 11px;
          flex-shrink: 0;
        }
        .sr-amount {
          font: 700 24px/1 var(--mp-font-ios);
          color: #111;
          letter-spacing: -0.02em;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .sr-amount .cents {
          font-size: 14px;
          color: #555;
        }
        .sr-rows {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding-top: 8px;
          border-top: 1px solid #f3f4f6;
        }
        .sr-trace {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 5px;
          font: 400 10px/1 ui-monospace, 'SF Mono', Menlo, monospace;
          color: #555;
        }
        .sr-acq {
          border-radius: 14px;
          padding: 12px 12px 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #fff;
          box-shadow: 0 6px 20px
            color-mix(in srgb, var(--brand) 35%, transparent);
        }
        .sr-acq-eyebrow {
          font: 600 9px/1 var(--mp-font-ios);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.75);
        }
        .sr-acq-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sr-acq-logo {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          object-fit: cover;
          background: #fff;
          flex-shrink: 0;
          padding: 4px;
        }
        .sr-acq-app-icon {
          width: 44px;
          height: 44px;
          border-radius: 28%;
          object-fit: cover;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
        }
        .sr-acq-mark {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.18);
          color: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font: 700 16px/1 var(--mp-font-display);
          flex-shrink: 0;
        }
        .sr-acq-text {
          min-width: 0;
        }
        .sr-acq-text strong {
          display: block;
          font: 600 13px/1.2 var(--mp-font-ios);
          color: #fff;
          margin-bottom: 2px;
          letter-spacing: -0.01em;
        }
        .sr-acq-text p {
          font: 400 11px/1.3 var(--mp-font-ios);
          color: rgba(255, 255, 255, 0.88);
          margin: 0;
        }
        .sr-acq-cta {
          width: 100%;
          background: #fff;
          border: 0;
          padding: 11px;
          border-radius: 10px;
          font: 700 13px/1 var(--mp-font-ios);
          cursor: pointer;
          letter-spacing: -0.01em;
        }
        .sr-foot {
          text-align: center;
          padding: 2px 0;
          font: 400 9.5px/1.4 var(--mp-font-ios);
          color: #aaa;
        }
      `}</style>
    </div>
  );
}

function SrRow({k, v}: {k: string; v: React.ReactNode}) {
  return (
    <div className="sr-row">
      <span className="k">{k}</span>
      <span className="v">{v}</span>
      <style jsx>{`
        .sr-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          font: 400 12px/1.3 var(--mp-font-ios);
        }
        .k {
          color: #888;
          flex-shrink: 0;
        }
        .v {
          color: #111;
          font-weight: 500;
          text-align: right;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}

function formatDateTime(d: Date): string {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'p. m.' : 'a. m.';
  h = h % 12 || 12;
  return `${day} ${month} ${year}, ${h}:${m} ${ampm}`;
}

function generateTraceCode(): string {
  // Format used by SPEI: starts with bank code + sequential digits
  let s = 'S0100260';
  for (let i = 0; i < 12; i++) s += Math.floor(Math.random() * 10);
  return s;
}
