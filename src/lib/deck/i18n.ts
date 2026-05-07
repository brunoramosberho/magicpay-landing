// Bilingual strings for the deck — ported from i18n.js, with team-feedback edits applied.
// Slide numbers reflect the 19-slide order in the design's index.html (Cover=01, Cierre=19).

export type Locale = 'es' | 'en';

export const i18n = {
  es: {
    // 01 Cover
    cover_kicker: 'Capa de experiencia de pagos',
    cover_title: 'magic para',
    cover_for: 'para',
    cover_subline: 'Pitch comercial 2026',
    cover_subtitle:
      'Pagos desde el chat. Con un tap, un emoji, o tu voz. Tu marca, tus rieles, tus clientes.',
    cover_speaker: 'Bruno Ramos · CEO & Founder',
    cover_speaker_full: 'CEO & Founder, magic — Marzo 2026',
    cover_msg_them: '¿Me prestas para la cena?',
    cover_claim: 'Cobrar al banco',
    cover_date: 'Marzo 2026',

    // 02 Background
    bg_label: '02 — Background',
    bg_title: 'Un poco de contexto',
    bg_name: 'Bruno Ramos',
    bg_role: 'CEO & Founder',
    bg_swap_intro: 'Fundé y escalé Swap, la primera billetera móvil de México, entregando pagos sin fricción.',
    bg_swap_b1: '500K+ usuarios — transferencias instantáneas, pagos con tarjeta, y los primeros pagos basados en WhatsApp en México.',
    bg_swap_b2: 'Expansión a B2B: APIs detrás de Clip, Santander, Albo y otras fintechs.',
    bg_swap_b3: 'Procesamos +$2B USD al año y conseguimos licencia IFPE en 2022.',
    bg_swap_b4: 'Adquirida por Clip en 2020, la fintech más grande de México.',
    bg_clip_intro: 'En Clip, lideré el desarrollo de productos de servicios financieros:',
    bg_clip_b1: 'Lancé la Cuenta Digital, aprovechando IFPE para habilitar payouts instantáneos a comercios.',
    bg_clip_b2: 'Construí y escalé la solución de lending, ofreciendo crédito basado en comportamiento de ventas.',

    // 03 Infrastructure
    infra_label: '03 — Infraestructura',
    infra_kicker: 'Real-time payments ya es la realidad',
    infra_title: 'México ya tiene la infraestructura',
    infra_stat1: '$579B',
    infra_stat1_label: 'pesos al año en transferencias inmediatas',
    infra_stat2: '24/7',
    infra_stat2_label: 'pagos inmediatos disponibles',
    infra_stat3: '+40%',
    infra_stat3_label: 'crecimiento anual en transacciones',
    infra_chart_caption:
      'PIX y UPI demostraron que un poquito mejor de experiencia detona crecimiento exponencial. SPEI tiene la misma materia prima.',
    infra_footnote: 'SPEI, DiMo y CoDi cubren los rieles. Lo que falta es la capa de experiencia.',
    rail_pix: 'PIX (Brasil)',
    rail_upi: 'UPI (India)',
    rail_spei: 'SPEI (México)',
    rail_growth: 'Crecimiento de adopción',

    // 04 WhatsApp
    wa_label: '04 — Canal central',
    wa_kicker: 'El canal central de México',
    wa_title: 'WhatsApp domina la comunicación',
    wa_stat1: '74M',
    wa_stat1_label: 'usuarios en México (2024)',
    wa_stat2: 'Top 6',
    wa_stat2_label: 'mercados a nivel mundial',
    wa_stat3: '#1',
    wa_stat3_label: 'plataforma más usada del país',
    wa_quote:
      'La mayoría de las gestiones económicas cotidianas ya se coordinan por chat — pero el pago sale del chat.',

    // 05 Problem
    prob_label: '05 — El problema',
    prob_quote: 'El problema no está en los rieles,\nsino en la capa de experiencia.',
    prob_caption:
      'Hoy mandar dinero requiere salir del chat, abrir la app del banco, capturar CLABE, monto, autenticarte, regresar. ~90 taps para algo que debería ser uno.',

    // 06 Flow comparison
    flow_label: '06 — Hoy',
    flow_title: 'Cómo se siente hoy mandar dinero',
    flow_today_label: 'SPEI · ~90 taps · ~2 min',
    flow_saved_label: 'Cuenta guardada / PIX / Bizum · ~30–40 taps',
    flow_magic_label: 'Con magic · 3 taps · ~4 seg',

    // 07 What is magic
    magic_label: '07 — La solución',
    magic_kicker: '¿Qué es magic?',
    magic_title: 'Enviar dinero debería sentirse mágico',
    magic_b1_title: 'SDK que vive dentro de tu app',
    magic_b1_desc:
      'Se integra con tu iOS, Android o React Native existente. No requiere migración.',
    magic_b2_title: 'Pagos desde cualquier chat',
    magic_b2_desc:
      'Teclado de pagos del banco. Funciona en WhatsApp, iMessage, Telegram, Instagram.',
    magic_b3_title: 'El banco mantiene el control',
    magic_b3_desc:
      'Autorización, KYC/AML y rieles (SPEI/DiMo) son tuyos. magic nunca custodia fondos.',
    magic_modes_label: 'Las tres formas de pagar con magic',
    magic_modes: 'emoji · tap · voz',

    // 08 Keyboard demo
    kb_label: '08 — Demo: teclado',
    kb_kicker: 'Manda dinero con un mensaje',
    kb_title: 'Teclado de pagos del banco, en cualquier chat',
    kb_explanation:
      'El teclado es parte del app del banco. No requiere integración con WhatsApp ni con ninguna app de mensajería — funciona en todas.',

    // 09 30x
    thirtyx_label: '09 — Velocidad',
    thirtyx_big: '30×',
    thirtyx_kicker: 'más rápido',
    thirtyx_caption: 'Que abrir tu app del banco, capturar CLABEs y volver al chat.',
    thirtyx_today: 'Hoy · ~90 taps · ~2 min',
    thirtyx_saved: 'Cuenta guardada · ~30–40 taps',
    thirtyx_magic: 'Con magic · 3 taps · ~4 seg',

    // 10 Claim
    claim_label: '10 — Recibir dinero',
    claim_kicker: 'Recibir dinero sin riesgos ni pasos repetitivos',
    claim_title: 'Ligas de pago seguras e instantáneas',
    claim_step1_title: '1. Toca la liga',
    claim_step1_desc: 'El destinatario recibe la liga en cualquier chat.',
    claim_step2_title: '2. Cobra al banco',
    claim_step2_desc: 'Página segura del banco — captura CLABE solo la primera vez.',
    claim_step3_title: '3. Listo',
    claim_step3_desc: 'Recibe el dinero en su cuenta. Pagos siguientes: un solo tap.',

    // 11 Tap
    tap_label: '11 — Tap',
    tap_kicker: 'Pagos con un toque',
    tap_title: 'Manda dinero con un tap',
    tap_caption:
      'NFC entre dos teléfonos. La liga viaja por aire. El cobro se reclama desde la app del banco del recipiente.',

    // 12 Voice
    voice_label: '12 — Voz',
    voice_kicker: 'Palabras mágicas',
    voice_title: 'Manda dinero con tu voz',
    voice_press_to_talk: 'Presiona para hablar',
    voice_listening: 'Escuchando…',
    voice_thinking: 'Interpretando…',
    voice_try: 'Prueba decir: "Mándale 500 pesos a Jenny"',
    voice_no_support:
      'Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.',
    voice_send: 'Enviar',
    voice_recipient: 'Destinatario',
    voice_amount: 'Monto',
    voice_concept: 'Concepto',
    voice_unrecognized: 'No entendí. Intenta de nuevo.',
    voice_searching_contact: 'Buscando contacto…',
    voice_opening_whatsapp: 'Abriendo WhatsApp…',

    // 13 White-label
    wl_label: '13 — White-label',
    wl_kicker: 'Tu marca, tus rieles, tus clientes',
    wl_title: 'Personaliza el teclado en vivo',
    wl_caption: 'Cambia el color y mira como el teclado se adapta sin tocar código.',
    wl_color: 'Color primario',
    wl_preview: 'Preview en vivo',

    // 14 Security
    sec_label: '14 — Seguridad',
    sec_kicker: 'Protección en cada paso',
    sec_title: 'Seguridad implementada',
    sec_1_title: 'Arquitectura sin custodia',
    sec_1_desc:
      'magic nunca toca el dinero. Todas las transferencias se originan, liquidan y registran exclusivamente en tus sistemas.',
    sec_2_title: 'Autenticación del banco',
    sec_2_desc:
      'Las transacciones se firman con tus mismos factores: biometría, Token, NIP. magic solo orquesta la experiencia.',
    sec_3_title: 'Integridad de las ligas',
    sec_3_desc:
      'UUID criptográficamente fuerte. Vencimiento configurable. Detección proactiva de ataques.',
    sec_4_title: 'Gestión de riesgos',
    sec_4_desc:
      'Límites configurables por monto, frecuencia y usuario. Telemetría a tus sistemas de fraude y auditoría.',

    // 15 Benefits
    ben_label: '15 — Beneficios',
    ben_kicker: 'El motor para ganar Top of Wallet',
    ben_title: 'Beneficios para el banco',
    ben_1_title: 'Primarización y rentabilidad',
    ben_1_desc:
      'Top of Wallet: al resolver pagos cotidianos en el chat, tu app se vuelve la #1. Mayores saldos abren puerta a crédito e inversiones.',
    ben_2_title: 'Adquisición viral',
    ben_2_desc:
      'Cada liga enviada expone tu marca a no-clientes. Crecimiento orgánico vía recomendación implícita.',
    ben_3_title: 'Eficiencia operativa',
    ben_3_desc:
      'Datos prellenados eliminan errores de CLABE. Menos llamadas al call center. Menor carga manual.',
    ben_4_title: 'Inteligencia de datos',
    ben_4_desc:
      'Señales transaccionales para Next-Best-Offer. Trazabilidad total alineada a KYC/AML.',

    // 16 Implementation
    impl_label: '16 — Implementación',
    impl_kicker: 'Implementación mágica',
    impl_title: 'Lanzamiento en un Sprint, no en años',
    impl_hero_stat: '45 min',
    impl_hero_stat_label: 'integración del SDK',
    impl_sprint_stat: '1 Sprint',
    impl_sprint_stat_label: 'integración completa',
    impl_services_title: 'Solo 3 servicios que exponer',
    impl_service1: 'Generar liga de pago',
    impl_service2: 'Cobrar liga',
    impl_service3: 'Webhook de eventos',
    impl_no_migration: 'Sin cambios en sistemas críticos · Sin migraciones complejas',
    impl_docs_cta: 'Ver documentación completa',
    impl_docs_url: 'mgic.me/docs',

    // 17 Regulatory
    reg_label: '17 — Regulatorio',
    reg_kicker: 'Por qué no se requiere permiso de CNBV o Banxico',
    reg_title: 'Regulación, resuelta',
    reg_1: 'magic solo integra tecnología — no es entidad financiera, no opera ni custodia fondos.',
    reg_2: 'Tu banco ejecuta los pagos y cumple con KYC/AML — magic no interviene en regulación.',
    reg_3: 'magic no almacena credenciales ni hace clearing — solo transmite instrucciones.',
    reg_4: 'Todo ocurre dentro del entorno seguro de tu banco.',
    reg_5: 'No requiere autorización previa, siempre que el banco mantenga su cumplimiento.',
    reg_6: 'Basado en la Ley Fintech. magic no es IFPE, transmisor de dinero ni agregador.',

    // 18 Pricing
    price_label: '18 — Pricing',
    price_kicker: 'Transparente. Escalable. Adaptado a tus necesidades.',
    price_title: 'Estructura de precios',
    price_1_title: 'Kick off',
    price_1_desc: 'Configuración inicial, integración del SDK y soporte personalizado.',
    price_2_title: 'Licencia mensual',
    price_2_desc: 'Por el uso del SDK en tu aplicación.',
    price_3_title: 'Fee por usuario activo',
    price_3_desc: 'Basado en usuarios que generen ligas de pago activamente.',
    price_open: 'A definir contigo',
    price_inc_title: 'Beneficios incluidos',
    price_inc_1: 'Soporte técnico continuo y personalizado',
    price_inc_2: 'Actualizaciones constantes del SDK',
    price_inc_3: 'Plataforma de métricas: adopción, retención, frecuencia',
    price_inc_4: 'Escalabilidad flexible — crece con tu demanda',

    // 19 Closing
    close_thanks: 'Gracias',
    close_caption: 'Hablemos de cómo magic puede vivir dentro de tu app.',
    close_name: 'Bruno Ramos',
    close_email: 'bruno@mgic.me',
    close_url: 'mgic.me'
  },

  en: {
    cover_kicker: 'Payments experience layer',
    cover_title: 'magic for',
    cover_for: 'for',
    cover_subline: 'Commercial pitch 2026',
    cover_subtitle:
      'Payments from the chat. With a tap, an emoji, or your voice. Your brand, your rails, your customers.',
    cover_speaker: 'Bruno Ramos · CEO & Founder',
    cover_speaker_full: 'CEO & Founder, magic — March 2026',
    cover_msg_them: 'Can you cover dinner?',
    cover_claim: 'Claim from bank',
    cover_date: 'March 2026',

    bg_label: '02 — Background',
    bg_title: 'A bit of context',
    bg_name: 'Bruno Ramos',
    bg_role: 'CEO & Founder',
    bg_swap_intro: "Founded and scaled Swap, Mexico's first mobile wallet, delivering seamless payments.",
    bg_swap_b1: "500K+ users — instant money transfers, card payments, and Mexico's first WhatsApp-based payments.",
    bg_swap_b2: 'Expanded into B2B: APIs powering Clip, Santander, Albo, and other fintechs.',
    bg_swap_b3: 'Processed +$2B USD annually and secured IFPE license in 2022.',
    bg_swap_b4: "Acquired by Clip in 2020, Mexico's largest fintech.",
    bg_clip_intro: 'At Clip, led financial services product development:',
    bg_clip_b1: 'Launched the Digital Account, leveraging IFPE to enable instant merchant payouts.',
    bg_clip_b2: 'Built and scaled the lending solution, offering credit based on sales behavior.',

    infra_label: '03 — Infrastructure',
    infra_kicker: 'Real-time payments are already a reality',
    infra_title: 'Mexico already has the infrastructure',
    infra_stat1: '$579B',
    infra_stat1_label: 'MXN/year in real-time transfers',
    infra_stat2: '24/7',
    infra_stat2_label: 'instant payments available',
    infra_stat3: '+40%',
    infra_stat3_label: 'yearly growth in transactions',
    infra_chart_caption:
      'PIX and UPI proved that a slightly better experience triggers exponential growth. SPEI has the same raw material.',
    infra_footnote: "SPEI, DiMo and CoDi cover the rails. What's missing is the experience layer.",
    rail_pix: 'PIX (Brazil)',
    rail_upi: 'UPI (India)',
    rail_spei: 'SPEI (Mexico)',
    rail_growth: 'Adoption growth',

    wa_label: '04 — Central channel',
    wa_kicker: "Mexico's central channel",
    wa_title: 'WhatsApp dominates communication',
    wa_stat1: '74M',
    wa_stat1_label: 'users in Mexico (2024)',
    wa_stat2: 'Top 6',
    wa_stat2_label: 'markets worldwide',
    wa_stat3: '#1',
    wa_stat3_label: 'most-used platform in the country',
    wa_quote:
      'Most everyday financial coordination already happens in chat — but the payment has to leave the chat.',

    prob_label: '05 — The problem',
    prob_quote: "The problem isn't the rails,\nit's the experience layer.",
    prob_caption:
      'Today, sending money means leaving the chat, opening your bank app, capturing a CLABE, amount, authenticating, going back. ~90 taps for what should be one.',

    flow_label: '06 — Today',
    flow_title: 'What sending money feels like today',
    flow_today_label: 'SPEI · ~90 taps · ~2 min',
    flow_saved_label: 'Saved account / PIX / Bizum · ~30–40 taps',
    flow_magic_label: 'With magic · 3 taps · ~4 sec',

    magic_label: '07 — The solution',
    magic_kicker: 'What is magic?',
    magic_title: 'Sending money should feel magical',
    magic_b1_title: 'SDK that lives inside your app',
    magic_b1_desc:
      'Integrates with your existing iOS, Android, or React Native app. No migration needed.',
    magic_b2_title: 'Payments from any chat',
    magic_b2_desc:
      "Your bank's payment keyboard. Works in WhatsApp, iMessage, Telegram, Instagram.",
    magic_b3_title: 'The bank stays in control',
    magic_b3_desc:
      'Authorization, KYC/AML and rails (SPEI/DiMo) stay with you. magic never holds funds.',
    magic_modes_label: 'The three ways to pay with magic',
    magic_modes: 'emoji · tap · voice',

    kb_label: '08 — Demo: keyboard',
    kb_kicker: 'Send money with a message',
    kb_title: "The bank's payment keyboard, in any chat",
    kb_explanation:
      "The keyboard is part of the bank's app. No WhatsApp integration needed — works in any messaging app.",

    thirtyx_label: '09 — Speed',
    thirtyx_big: '30×',
    thirtyx_kicker: 'faster',
    thirtyx_caption: 'Than opening your bank app, copying CLABEs, and going back to the chat.',
    thirtyx_today: 'Today · ~90 taps · ~2 min',
    thirtyx_saved: 'Saved account · ~30–40 taps',
    thirtyx_magic: 'With magic · 3 taps · ~4 sec',

    claim_label: '10 — Receiving money',
    claim_kicker: 'Receive money without risks or repeated steps',
    claim_title: 'Secure, instant payment links',
    claim_step1_title: '1. Tap the link',
    claim_step1_desc: 'The recipient gets the link in any chat.',
    claim_step2_title: '2. Claim at the bank',
    claim_step2_desc: 'Secure bank page — CLABE captured only the first time.',
    claim_step3_title: '3. Done',
    claim_step3_desc: 'Money lands in their account. Next claims: one tap.',

    tap_label: '11 — Tap',
    tap_kicker: 'Payments with one touch',
    tap_title: 'Send money with a tap',
    tap_caption:
      "NFC between two phones. The link travels through the air. The recipient claims from their bank app.",

    voice_label: '12 — Voice',
    voice_kicker: 'Magic words',
    voice_title: 'Send money with your voice',
    voice_press_to_talk: 'Press to talk',
    voice_listening: 'Listening…',
    voice_thinking: 'Interpreting…',
    voice_try: 'Try saying: "Send 500 pesos to Jenny"',
    voice_no_support: "Your browser doesn't support voice recognition. Use Chrome or Edge.",
    voice_send: 'Send',
    voice_recipient: 'Recipient',
    voice_amount: 'Amount',
    voice_concept: 'Note',
    voice_unrecognized: "I didn't catch that. Try again.",
    voice_searching_contact: 'Searching contact…',
    voice_opening_whatsapp: 'Opening WhatsApp…',

    wl_label: '13 — White-label',
    wl_kicker: 'Your brand, your rails, your customers',
    wl_title: 'Customize the keyboard live',
    wl_caption: 'Change the color and watch the keyboard adapt without code changes.',
    wl_color: 'Primary color',
    wl_preview: 'Live preview',

    sec_label: '14 — Security',
    sec_kicker: 'Protection at every step',
    sec_title: 'Security, implemented',
    sec_1_title: 'Non-custodial architecture',
    sec_1_desc:
      'magic never touches the money. All transfers originate, settle and are recorded exclusively in your systems.',
    sec_2_title: 'Bank-issued authentication',
    sec_2_desc:
      'Transactions are signed with your factors: biometrics, Token, PIN. magic only orchestrates the experience.',
    sec_3_title: 'Link integrity',
    sec_3_desc:
      'Cryptographically strong UUID. Configurable expiration. Proactive attack detection.',
    sec_4_title: 'Risk management',
    sec_4_desc:
      'Configurable limits by amount, frequency, and user. Telemetry into your fraud and audit systems.',

    ben_label: '15 — Benefits',
    ben_kicker: 'The engine to win Top of Wallet',
    ben_title: 'Benefits for the bank',
    ben_1_title: 'Primary status & profitability',
    ben_1_desc:
      'Top of Wallet: by solving everyday in-chat payments, your app becomes #1. Higher balances unlock credit and investments.',
    ben_2_title: 'Viral acquisition',
    ben_2_desc:
      'Every link sent exposes your brand to non-customers. Organic growth via implicit referral.',
    ben_3_title: 'Operational efficiency',
    ben_3_desc:
      'Pre-filled data eliminates CLABE errors. Fewer call-center calls. Less manual load.',
    ben_4_title: 'Data intelligence',
    ben_4_desc:
      'Transactional signals for Next-Best-Offer. Full traceability aligned with KYC/AML.',

    impl_label: '16 — Implementation',
    impl_kicker: 'Magical implementation',
    impl_title: 'Launch in a Sprint, not in years',
    impl_hero_stat: '45 min',
    impl_hero_stat_label: 'SDK integration',
    impl_sprint_stat: '1 Sprint',
    impl_sprint_stat_label: 'full integration',
    impl_services_title: 'Only 3 services to expose',
    impl_service1: 'Generate payment link',
    impl_service2: 'Claim link',
    impl_service3: 'Events webhook',
    impl_no_migration: 'No changes to critical systems · No complex migrations',
    impl_docs_cta: 'Read full documentation',
    impl_docs_url: 'mgic.me/docs',

    reg_label: '17 — Regulatory',
    reg_kicker: 'Why no CNBV or Banxico permit is required',
    reg_title: 'Regulation, solved',
    reg_1:
      "magic only integrates technology — it isn't a financial entity, doesn't operate or hold funds.",
    reg_2: "Your bank executes payments and complies with KYC/AML — magic doesn't intervene.",
    reg_3: "magic doesn't store credentials or do clearing — only transmits instructions.",
    reg_4: "Everything happens within your bank's secure environment.",
    reg_5: 'No prior authorization needed, as long as the bank maintains its compliance.',
    reg_6: 'Based on the Fintech Law. magic is not an IFPE, money transmitter, or aggregator.',

    price_label: '18 — Pricing',
    price_kicker: 'Transparent. Scalable. Tailored to your needs.',
    price_title: 'Pricing structure',
    price_1_title: 'Kick off',
    price_1_desc: 'Initial setup, SDK integration, and personalized support.',
    price_2_title: 'Monthly license',
    price_2_desc: 'For SDK use in your application.',
    price_3_title: 'Fee per active user',
    price_3_desc: 'Based on users actively generating payment links.',
    price_open: 'To define together',
    price_inc_title: 'Included benefits',
    price_inc_1: 'Continuous, personalized technical support',
    price_inc_2: 'Constant SDK updates and improvements',
    price_inc_3: 'Metrics platform: adoption, retention, frequency',
    price_inc_4: 'Flexible scalability — grows with your demand',

    close_thanks: 'Thank you',
    close_caption: "Let's talk about how magic can live inside your app.",
    close_name: 'Bruno Ramos',
    close_email: 'bruno@mgic.me',
    close_url: 'mgic.me'
  }
} as const;

export type StringKey = keyof typeof i18n.es;
