'use client';

// Interactive claim flow — replicates the magicpay_web_claim "Cobrar transferencia"
// UI inside an iPhone frame. Two modes: "1ra vez" (full form) and "2da vez"
// (saved account, single tap). Per-country: México keeps the rich CODI-lookup
// autoplay; other corridors render a country-specific form (no autoplay, just
// the right rail names and field shapes — UPI for India, IBAN/Bizum for EU…).
// Uses var(--brand) so colors follow the client's brand_color.

import {useEffect, useMemo, useRef, useState} from 'react';

type Mode = 'first' | 'returning';
type Method = 'clabe' | 'dimo';

// ---------- Country corridor configs ----------
// Each country defines the currency it pays out in, a list of "rails" the
// recipient can choose between (e.g. ACH/Zelle in the US), and the saved
// account preview shown on the "2da vez" screen. Mexico is the canonical case
// — it keeps a separate, richer flow that drives a real CODI lookup. Other
// countries render a generic form for the same Reclamar flow.

type CountryCode = 'mx' | 'us' | 'co' | 'br' | 'eu' | 'ph' | 'in';

type CountryFieldDef = {
  key: string;
  label: string;
  placeholder: string;
  inputMode?: 'numeric' | 'tel' | 'email' | 'text';
  maxLength?: number;
  /** Minimum input length (digits/chars) to count the field as filled. */
  minLength?: number;
  /** If 'numeric', strip non-digits as the user types. */
  filter?: 'digits' | 'none';
};

type CountryMethodDef = {
  key: string;
  label: string;
  /** Either an emoji or null (then `badge` is rendered as a styled pill). */
  icon: string | null;
  /** Single-letter badge style icon when `icon` is null (e.g. 'D' for Dimo). */
  badge?: string;
  badgeColor?: string;
  fields: CountryFieldDef[];
};

type SavedAccountPreview = {
  /** Emoji shown in the small card icon */
  cardIcon: string;
  /** Primary identifier line (e.g. "************0163", "bruno@ybl") */
  primary: string;
  /** Secondary line — usually the bank / network name. */
  secondary: string;
  /** Holder name shown below */
  accountName: string;
  /** Account tail used in the Receipt (last 4 digits) */
  accountTail: string;
};

type CountryConfig = {
  code: CountryCode;
  flag: string;
  label: string;        // shown in the chip
  /** Currency rendered next to amounts */
  currency: {symbol: string; code: string};
  /** Display amount on the demo screens for this country */
  amount: string;
  /** Sender name shown on the receive screens */
  senderName: string;
  methods: CountryMethodDef[];
  saved: SavedAccountPreview;
};

const COUNTRIES: CountryConfig[] = [
  {
    code: 'mx',
    flag: '🇲🇽',
    label: 'México',
    currency: {symbol: '$', code: 'MXN'},
    amount: '150.00',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'clabe',
        label: 'CLABE/Tarjeta',
        icon: '🏦',
        fields: [
          {
            key: 'account',
            label: 'Cuenta destino',
            placeholder: 'CLABE (18) o Tarjeta (16)',
            inputMode: 'numeric',
            maxLength: 20,
            minLength: 16,
            filter: 'digits'
          },
          {
            key: 'name',
            label: 'Nombre completo del titular',
            placeholder: 'Como aparece en tu cuenta'
          }
        ]
      },
      {
        key: 'dimo',
        label: 'Dimo®',
        icon: null,
        badge: 'D',
        badgeColor: 'linear-gradient(135deg,#4ade80,#22c55e)',
        fields: [
          {
            key: 'phone',
            label: 'Número de teléfono',
            placeholder: '10 dígitos',
            inputMode: 'tel',
            maxLength: 10,
            minLength: 10,
            filter: 'digits'
          }
        ]
      }
    ],
    saved: {
      cardIcon: '💳',
      primary: '****************0163',
      secondary: '',           // Filled at render time with clientName
      accountName: 'Bruno Ramos Berho',
      accountTail: '0163'
    }
  },
  {
    code: 'us',
    flag: '🇺🇸',
    label: 'United States',
    currency: {symbol: '$', code: 'USD'},
    amount: '50.00',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'ach',
        label: 'ACH (Bank)',
        icon: '🏦',
        fields: [
          {
            key: 'routing',
            label: 'Routing number',
            placeholder: '9 digits',
            inputMode: 'numeric',
            maxLength: 9,
            minLength: 9,
            filter: 'digits'
          },
          {
            key: 'account',
            label: 'Account number',
            placeholder: '8–12 digits',
            inputMode: 'numeric',
            maxLength: 12,
            minLength: 6,
            filter: 'digits'
          }
        ]
      },
      {
        key: 'zelle',
        label: 'Zelle',
        icon: null,
        badge: 'Z',
        badgeColor: 'linear-gradient(135deg,#a855f7,#7c3aed)',
        fields: [
          {
            key: 'identifier',
            label: 'Email or US phone',
            placeholder: 'name@email.com or +1 555…',
            inputMode: 'email',
            minLength: 6
          }
        ]
      }
    ],
    saved: {
      cardIcon: '💳',
      primary: '************6411',
      secondary: 'Chase · ACH',
      accountName: 'Bruno R. Berho',
      accountTail: '6411'
    }
  },
  {
    code: 'co',
    flag: '🇨🇴',
    label: 'Colombia',
    currency: {symbol: '$', code: 'COP'},
    amount: '180.000',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'bank',
        label: 'Cuenta bancaria',
        icon: '🏦',
        fields: [
          {
            key: 'account',
            label: 'Número de cuenta',
            placeholder: '10–11 dígitos',
            inputMode: 'numeric',
            maxLength: 11,
            minLength: 9,
            filter: 'digits'
          },
          {
            key: 'name',
            label: 'Nombre del titular',
            placeholder: 'Como aparece en tu cuenta'
          }
        ]
      },
      {
        key: 'nequi',
        label: 'Nequi',
        icon: null,
        badge: 'N',
        badgeColor: 'linear-gradient(135deg,#e879f9,#c026d3)',
        fields: [
          {
            key: 'phone',
            label: 'Número Nequi',
            placeholder: '10 dígitos',
            inputMode: 'tel',
            maxLength: 10,
            minLength: 10,
            filter: 'digits'
          }
        ]
      }
    ],
    saved: {
      cardIcon: '📱',
      primary: '+57 ***-***-7321',
      secondary: 'Nequi',
      accountName: 'Bruno R. Berho',
      accountTail: '7321'
    }
  },
  {
    code: 'br',
    flag: '🇧🇷',
    label: 'Brasil',
    currency: {symbol: 'R$', code: 'BRL'},
    amount: '75,00',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'pix',
        label: 'Chave Pix',
        icon: null,
        badge: 'P',
        badgeColor: 'linear-gradient(135deg,#00b894,#00897b)',
        fields: [
          {
            key: 'key',
            label: 'CPF, e-mail, telefone ou chave aleatória',
            placeholder: 'bruno@email.com',
            inputMode: 'text',
            minLength: 5
          }
        ]
      },
      {
        key: 'bank',
        label: 'Conta bancária',
        icon: '🏦',
        fields: [
          {
            key: 'bank',
            label: 'Banco (código)',
            placeholder: '260 (Nubank)',
            inputMode: 'numeric',
            maxLength: 4,
            minLength: 3,
            filter: 'digits'
          },
          {
            key: 'account',
            label: 'Conta + dígito',
            placeholder: '1234567-8',
            inputMode: 'text',
            minLength: 6
          }
        ]
      }
    ],
    saved: {
      cardIcon: '🔑',
      primary: 'bruno@email.com',
      secondary: 'Pix · Nubank',
      accountName: 'Bruno R. Berho',
      accountTail: '5582'
    }
  },
  {
    code: 'eu',
    flag: '🇪🇺',
    label: 'Europa',
    currency: {symbol: '€', code: 'EUR'},
    amount: '15,00',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'iban',
        label: 'IBAN (SEPA)',
        icon: '🏦',
        fields: [
          {
            key: 'iban',
            label: 'IBAN',
            placeholder: 'ES91 2100 0418 4502 0005 1332',
            inputMode: 'text',
            minLength: 15
          }
        ]
      },
      {
        key: 'bizum',
        label: 'Bizum',
        icon: null,
        badge: 'B',
        badgeColor: 'linear-gradient(135deg,#22d3ee,#0e7490)',
        fields: [
          {
            key: 'phone',
            label: 'Móvil',
            placeholder: '+34 612 345 678',
            inputMode: 'tel',
            minLength: 9
          }
        ]
      }
    ],
    saved: {
      cardIcon: '💳',
      primary: 'ES** **** **** **** **** 1332',
      secondary: 'CaixaBank · SEPA',
      accountName: 'Bruno R. Berho',
      accountTail: '1332'
    }
  },
  {
    code: 'ph',
    flag: '🇵🇭',
    label: 'Philippines',
    currency: {symbol: '₱', code: 'PHP'},
    amount: '500.00',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'gcash',
        label: 'GCash',
        icon: null,
        badge: 'G',
        badgeColor: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
        fields: [
          {
            key: 'phone',
            label: 'GCash mobile number',
            placeholder: '+63 9XX XXX XXXX',
            inputMode: 'tel',
            minLength: 10
          }
        ]
      },
      {
        key: 'bank',
        label: 'Bank account',
        icon: '🏦',
        fields: [
          {
            key: 'bank',
            label: 'Bank',
            placeholder: 'BPI / BDO / UnionBank…',
            inputMode: 'text',
            minLength: 2
          },
          {
            key: 'account',
            label: 'Account number',
            placeholder: '10–12 digits',
            inputMode: 'numeric',
            maxLength: 12,
            minLength: 8,
            filter: 'digits'
          }
        ]
      }
    ],
    saved: {
      cardIcon: '📱',
      primary: '+63 9XX XXX 0987',
      secondary: 'GCash',
      accountName: 'Bruno R. Berho',
      accountTail: '0987'
    }
  },
  {
    code: 'in',
    flag: '🇮🇳',
    label: 'India',
    currency: {symbol: '₹', code: 'INR'},
    amount: '750',
    senderName: 'Bruno A. R. B.',
    methods: [
      {
        key: 'upi',
        label: 'UPI ID',
        icon: null,
        badge: 'U',
        badgeColor: 'linear-gradient(135deg,#fb923c,#ea580c)',
        fields: [
          {
            key: 'upi',
            label: 'UPI ID',
            placeholder: 'name@ybl / name@okhdfc',
            inputMode: 'email',
            minLength: 5
          }
        ]
      },
      {
        key: 'bank',
        label: 'Bank (IFSC)',
        icon: '🏦',
        fields: [
          {
            key: 'ifsc',
            label: 'IFSC code',
            placeholder: 'HDFC0001234',
            inputMode: 'text',
            maxLength: 11,
            minLength: 11
          },
          {
            key: 'account',
            label: 'Account number',
            placeholder: '9–18 digits',
            inputMode: 'numeric',
            maxLength: 18,
            minLength: 9,
            filter: 'digits'
          }
        ]
      }
    ],
    saved: {
      cardIcon: '🪙',
      primary: 'bruno@ybl',
      secondary: 'UPI · PhonePe',
      accountName: 'Bruno R. Berho',
      accountTail: 'ne@ybl'
    }
  }
];

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
  const [countryCode, setCountryCode] = useState<CountryCode>('mx');
  const userInteractedRef = useRef(false);
  const name = clientName ?? 'Stori';
  const country = useMemo(
    () => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0],
    [countryCode]
  );

  const switchMode = (m: Mode) => {
    userInteractedRef.current = true;
    setMode(m);
  };

  const switchCountry = (c: CountryCode) => {
    userInteractedRef.current = true;
    setCountryCode(c);
  };

  return (
    <div className="claim-stage">
      <div className="claim-country" role="tablist" aria-label="Country">
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            role="tab"
            aria-selected={c.code === countryCode}
            className={`country-chip ${c.code === countryCode ? 'active' : ''}`}
            onClick={() => switchCountry(c.code)}
          >
            <span className="country-flag" aria-hidden>
              {c.flag}
            </span>
            <span className="country-label">{c.label}</span>
          </button>
        ))}
      </div>

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
              country.code === 'mx' ? (
                <FirstTimeClaim
                  userInteractedRef={userInteractedRef}
                  clientName={name}
                  clientLogo={clientLogo}
                  clientAppIcon={clientAppIcon}
                  country={country}
                />
              ) : (
                <GenericFirstTimeClaim
                  key={country.code}
                  country={country}
                  clientName={name}
                  clientLogo={clientLogo}
                  clientAppIcon={clientAppIcon}
                />
              )
            ) : (
              <ReturningClaim
                key={country.code}
                clientName={name}
                clientLogo={clientLogo}
                clientAppIcon={clientAppIcon}
                country={country}
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
        .claim-country {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px;
          max-width: 100%;
        }
        .country-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--mp-white);
          border: 1px solid var(--mp-border-soft);
          border-radius: var(--mp-radius-pill);
          padding: 4px 10px 4px 6px;
          font: 500 11px/1 var(--mp-font-body);
          color: var(--mp-fg-muted);
          cursor: pointer;
          transition: all 160ms var(--mp-ease);
        }
        .country-chip:hover {
          color: var(--mp-ink);
          border-color: color-mix(in srgb, var(--brand) 35%, var(--mp-border-soft));
        }
        .country-chip.active {
          background: var(--brand);
          color: #fff;
          border-color: var(--brand);
          box-shadow: 0 2px 10px
            color-mix(in srgb, var(--brand) 28%, transparent);
        }
        .country-flag {
          font-size: 14px;
          line-height: 1;
        }
        .country-label {
          letter-spacing: 0.01em;
        }
        @media (max-width: 640px) {
          .claim-country {
            gap: 4px;
          }
          .country-chip {
            padding: 3px 8px 3px 5px;
            font-size: 10px;
            gap: 4px;
          }
          .country-flag {
            font-size: 12px;
          }
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
  clientAppIcon,
  country: _country
}: {
  userInteractedRef: React.MutableRefObject<boolean>;
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
  /** Currently unused — this component is MX-only and reads its own
   *  Mexico-specific labels/sample. The prop exists so the parent can pass
   *  consistent context if we ever fold this into the generic flow. */
  country?: CountryConfig;
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
        currencySymbol="$"
        currencyCode="MXN"
        accountTail={acctTail}
        accountName={acctName}
        accountBank={acctBank}
        accountPrimary={`002***********${acctTail}`}
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

// ---------- Generic first-time claim (non-MX corridors) ----------
// Lighter-weight cousin of FirstTimeClaim — no CODI lookup or autoplay. Reads
// methods + fields from the country config and lights up Reclamar when each
// field has enough characters to look complete. Each new country plugs in by
// adding an entry to COUNTRIES.

function GenericFirstTimeClaim({
  country,
  clientName,
  clientLogo,
  clientAppIcon
}: {
  country: CountryConfig;
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const [methodKey, setMethodKey] = useState<string>(country.methods[0].key);
  const [values, setValues] = useState<Record<string, string>>({});
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const method =
    country.methods.find((m) => m.key === methodKey) ?? country.methods[0];

  const setValue = (key: string, raw: string) => {
    const field = method.fields.find((f) => f.key === key);
    let value = raw;
    if (field?.filter === 'digits') value = raw.replace(/\D/g, '');
    if (field?.maxLength) value = value.slice(0, field.maxLength);
    setValues((v) => ({...v, [key]: value}));
  };

  const allFilled = method.fields.every((f) => {
    const v = (values[f.key] ?? '').trim();
    const min = f.minLength ?? 3;
    return v.length >= min;
  });

  const triggerClaim = () => {
    if (!allFilled || claiming) return;
    setClaiming(true);
    setTimeout(() => {
      setClaiming(false);
      setClaimed(true);
    }, 1400);
  };

  // Reset when the method changes — each rail has different field shapes.
  useEffect(() => {
    setValues({});
  }, [methodKey]);

  if (claimed) {
    // Build a meaningful accountPrimary from whatever the user typed.
    const lastField = method.fields[method.fields.length - 1];
    const lastValue = values[lastField.key] ?? '';
    const tail = lastValue.slice(-4) || country.saved.accountTail;
    const accountPrimary =
      method.fields.length > 1
        ? lastValue
        : `${method.label} · ${lastValue}`;
    return (
      <SuccessReceipt
        senderName={country.senderName}
        amount={country.amount}
        currencySymbol={country.currency.symbol}
        currencyCode={country.currency.code}
        accountTail={tail}
        accountName={country.saved.accountName}
        accountBank={method.label}
        accountPrimary={accountPrimary}
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
            <p>
              Recibe este pago en {country.flag} {country.label}.
            </p>
          </div>
          <span className="ft-badge">Pendiente</span>
        </header>

        <div className="ft-summary">
          <div className="ft-amount">
            {country.currency.symbol}
            {country.amount}
            <span className="ft-currency-code"> {country.currency.code}</span>
          </div>
          <div className="ft-rows">
            <Row k="Concepto" v={<><span aria-hidden>🍽️</span> Comida</>} />
            <Row k="De" v={country.senderName} />
            <Row k="País destino" v={`${country.flag} ${country.label}`} />
          </div>
        </div>

        <div
          className="ft-tabs"
          style={{
            gridTemplateColumns: `repeat(${country.methods.length}, 1fr)`
          }}
        >
          {country.methods.map((m) => (
            <button
              key={m.key}
              className={`ft-tab ${m.key === methodKey ? 'active' : ''}`}
              onClick={() => setMethodKey(m.key)}
            >
              {m.icon ? (
                <span aria-hidden>{m.icon}</span>
              ) : (
                <span
                  className="generic-badge"
                  aria-hidden
                  style={{background: m.badgeColor ?? 'var(--brand)'}}
                >
                  <span>{m.badge ?? m.label.charAt(0)}</span>
                </span>
              )}
              {m.label}
            </button>
          ))}
        </div>

        {method.fields.map((f) => (
          <div className="ft-field" key={f.key}>
            <label>{f.label}</label>
            <input
              type={f.inputMode === 'email' ? 'email' : 'text'}
              inputMode={f.inputMode}
              placeholder={f.placeholder}
              value={values[f.key] ?? ''}
              maxLength={f.maxLength}
              onChange={(e) => setValue(f.key, e.target.value)}
            />
          </div>
        ))}

        <button
          className="ft-claim"
          disabled={!allFilled || claiming}
          onClick={triggerClaim}
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
        .ft-currency-code {
          font-size: 12px;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.04em;
        }
        .ft-rows {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ft-tabs {
          display: grid;
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
        }
        .ft-tab.active {
          background: #fff;
          color: #111;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .generic-badge {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .generic-badge span {
          color: #fff;
          font-size: 9px;
          font-weight: 700;
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
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
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
  clientAppIcon,
  country
}: {
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
  country: CountryConfig;
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

  // Mexico's `secondary` is the client name (the bank) — other countries
  // already encode the rail/bank in their config.
  const savedBank =
    country.code === 'mx' && !country.saved.secondary
      ? clientName
      : country.saved.secondary || clientName;

  if (claimed) {
    return (
      <SuccessReceipt
        senderName={country.senderName}
        amount={country.amount}
        currencySymbol={country.currency.symbol}
        currencyCode={country.currency.code}
        accountTail={country.saved.accountTail}
        accountName={country.saved.accountName}
        accountBank={savedBank}
        accountPrimary={country.saved.primary}
        clientName={clientName}
        clientLogo={clientLogo}
        clientAppIcon={clientAppIcon}
      />
    );
  }

  return (
    <SavedAccountClaim
      senderName={country.senderName}
      amount={country.amount}
      currencySymbol={country.currency.symbol}
      saved={{...country.saved, secondary: savedBank}}
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
  currencySymbol,
  saved,
  clientName,
  clientLogo,
  claiming,
  onClaim
}: {
  senderName: string;
  amount: string;
  currencySymbol: string;
  saved: SavedAccountPreview;
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
          {currencySymbol}
          {amount}
        </div>
        <p className="rc-instr">
          El dinero se enviará a tu cuenta utilizada anteriormente:
        </p>
        <div className="rc-card" style={{borderColor: 'var(--brand)'}}>
          <div className="rc-card-icon" aria-hidden>
            {saved.cardIcon}
          </div>
          <div>
            <div className="rc-card-num">{saved.primary}</div>
            <div className="rc-card-bank">{saved.secondary}</div>
            <div className="rc-card-name">{saved.accountName}</div>
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
  currencySymbol,
  currencyCode,
  accountTail,
  accountName,
  accountBank,
  accountPrimary,
  clientName,
  clientLogo,
  clientAppIcon
}: {
  senderName: string;
  amount: string;
  currencySymbol: string;
  currencyCode?: string;
  accountTail: string;
  accountName: string;
  accountBank: string;
  /** Optional explicit account identifier line. Falls back to a masked tail. */
  accountPrimary?: string;
  clientName: string;
  clientLogo?: string;
  clientAppIcon?: string;
}) {
  const now = new Date();
  const sent = formatDateTime(now);
  const trace = generateTraceCode();
  // Split amount on either '.' or ',' depending on the locale used in config
  const splitMatch = amount.match(/^(.+?)([.,])(\d+)$/);
  const intAmount = splitMatch ? splitMatch[1] : amount;
  const decAmount = splitMatch ? splitMatch[3] : '00';
  const decSep = splitMatch ? splitMatch[2] : '.';
  const accountLine = accountPrimary || `***${accountTail}`;

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
              {currencySymbol}
              {intAmount}
              <span className="cents">
                {decSep}
                {decAmount}
              </span>
              {currencyCode && (
                <span className="sr-amount-code"> {currencyCode}</span>
              )}
            </div>
          </div>
          <div className="sr-rows">
            <SrRow k="De" v={senderName} />
            <SrRow k="Enviado a" v={accountName} />
            <SrRow k="Cuenta" v={accountLine} />
            <SrRow k="Red / Banco" v={accountBank} />
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
        .sr-amount-code {
          font-size: 11px;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.04em;
          margin-left: 4px;
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
