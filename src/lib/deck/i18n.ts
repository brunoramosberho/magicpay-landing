// Bilingual strings for the deck — ported from i18n.js, with team-feedback edits applied.
// Slide numbers reflect the 19-slide order in the design's index.html (Cover=01, Cierre=19).

export type Locale = 'es' | 'en';

export const i18n = {
  es: {
    // 01 Cover
    cover_kicker: 'Capa de experiencia de pagos',
    cover_title: 'magic para',
    cover_for: 'para',
    cover_regulator_audience: 'bancos',
    cover_subline: 'Pitch comercial 2026',
    cover_subtitle:
      'Pagos desde el chat. Con un tap, un emoji, o tu voz. Tu marca, tus rieles, tus clientes.',
    cover_msg_them: '¿Me prestas para la cena?',
    cover_msg_amount: 'Son $300 🍽️',
    cover_claim: 'Cobrar al banco',
    cover_date: 'Mayo 2026',

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
    infra_kicker: 'Real-time payments ya son la realidad global',
    infra_title: 'El riel ya existe. La experiencia es lo que cambia.',
    infra_stat1: '5+',
    infra_stat1_label: 'rieles real-time activos en mercados clave',
    infra_stat2: '24/7',
    infra_stat2_label: 'pagos inmediatos disponibles',
    infra_stat3: '+40-70%',
    infra_stat3_label: 'crecimiento anual en transacciones',
    infra_chart_caption:
      'Real-time es real-time. Lo que diferencia los rieles es la experiencia: Pix y Bizum lo demostraron — el riel + un poquito mejor de UX detona crecimiento masivo.',
    infra_footnote:
      'El riel ya existe en cada país. Lo que falta — y lo que escala adopción — es la capa de experiencia. magic la entrega encima de cualquier riel.',
    rail_pix: 'Pix · Brasil',
    rail_upi: 'UPI · India',
    rail_spei: 'SPEI · México',
    rail_sct_inst: 'SCT Inst · Europa',
    rail_bizum: 'Bizum · España',
    rail_growth: 'Crecimiento de adopción',

    // 04 WhatsApp
    wa_label: '04 — Canal central',
    wa_kicker: 'El chat es el canal central en cualquier país',
    wa_title: 'Cada mercado tiene su chat dominante. magic funciona en todos.',
    wa_stat1: '5B+',
    wa_stat1_label: 'personas usan apps de mensajería en el mundo',
    wa_stat2: '#1',
    wa_stat2_label: 'canal en cada uno de los mercados clave',
    wa_stat3: '8+',
    wa_stat3_label: 'apps de chat soportadas nativamente por magic',
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
    flow_today_label: 'Cuenta nueva (SPEI, Pix, UPI, Bizum)',
    flow_saved_label: 'Cuenta guardada (SPEI, Pix, UPI, Bizum)',
    flow_magic_label: 'Con magic',
    flow_today_meta: '~90 taps · ~2 min',
    flow_saved_meta: '~35 taps · ~40 s',
    flow_magic_meta: '3 taps · ~4 s',
    flow_done: 'Pago enviado',

    // 07 What is magic
    magic_label: '07 — La solución',
    magic_kicker: '¿Qué es magic?',
    magic_title: 'Enviar dinero debería sentirse mágico',
    magic_b1_title: 'SDK que vive dentro de tu app',
    magic_b1_title_regulator: 'SDK que vive dentro del app del banco',
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
    kb_label: '08 — Teclado',
    kb_kicker: 'Manda dinero con un mensaje',
    kb_title: 'Teclado de pagos de {client}, en cualquier chat',
    kb_title_regulator: 'Teclado de pagos del banco, en cualquier chat',
    kb_explanation:
      'El teclado es parte del app de {client}. No requiere integración con WhatsApp ni con ninguna app de mensajería — funciona en todas.',
    kb_explanation_regulator:
      'El teclado es parte del app del banco. No requiere integración con WhatsApp ni con ninguna app de mensajería — funciona en todas.',
    // Label shown in the iOS keyboard switcher inside the demo. On the
    // regulator deck it must read as a generic bank, not the regulator.
    kb_switch_bank: 'El Banco',

    // 08 Keyboard walkthrough — captions for each step (0..6)
    kbw_visitor_fallback: 'Bruno R',
    kbw_chat_contact: 'María',
    kbw_chat_via: 'vía',
    kbw_chat_msg1: '¿Me prestas para la comida? 🍣',
    kbw_chat_msg2: 'Son $50 MXN',
    kbw_restart_hint: 'Volver al inicio (limpia la conversación)',
    kbw_login_title: 'Iniciando sesión en {client}',
    kbw_login_sub: 'Autenticación dentro del app del banco',
    kbw_success_title: 'Liga generada exitosamente',
    kbw_step_0:
      'Llega un mensaje en WhatsApp pidiendo una transferencia.',
    kbw_step_1:
      'Se hace el cambio del teclado, y se selecciona el teclado de {client}.',
    kbw_step_2:
      'Se activa el teclado magic, integrado en el app del banco. Funciona en cualquier app de mensajería sin tocar su código.',
    kbw_step_3:
      'Se abre el teclado, forma parte de la misma aplicación de {client}. Se captura el monto a enviar.',
    kbw_step_4:
      'Se inicia sesión de {client}. Es la misma sesión y autorización que el app.',
    kbw_step_5:
      'Se genera un token dinámico como segundo factor de autorización, ligado directamente al dispositivo.',
    kbw_step_6:
      'Liga de pago lista y enviada en la conversación. Una sola interacción, sin salir del chat.',
    kbw_loader_title: 'Generando liga de pago…',
    kbw_loader_sub: 'Token dinámico · firma del banco',

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
    claim_info_saved_title: 'Una vez, listo para siempre',
    claim_info_saved_desc:
      'La cuenta se guarda en el browser de forma segura. La siguiente liga se reclama con un solo tap.',
    claim_info_acq_title: 'Canal de adquisición',
    claim_info_acq_desc:
      'Si el receptor no es cliente, ve un banner para descargar tu app — adquieres usuarios cada vez que un cliente envía dinero.',

    // 11 Tap
    tap_label: '11 — Tap',
    tap_kicker: 'Pagos con un toque',
    tap_title: 'Manda dinero con un tap',
    tap_caption:
      'NFC entre dos teléfonos. La liga viaja por aire. El cobro se reclama como cualquier liga de pago — sin pasar por el app del banco.',

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
    sec_2_title: 'Misma autenticación del app {client}',
    sec_2_title_regulator: 'Misma autenticación del app del banco',
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
    ben_title: 'Beneficios para {client}',
    ben_title_regulator: 'Beneficios para el banco',
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
    impl_service1: 'Login',
    impl_service1_desc: 'Validación previa de credenciales · responde con sessionToken.',
    impl_service2: 'Autorización',
    impl_service2_desc: 'Aprueba la transacción tras la biometría · responde con txCode.',
    impl_service3: 'Claim',
    impl_service3_desc: 'Ejecuta la transferencia real por tu rail (SPEI/DiMo).',
    impl_data_title: 'Qué información guarda magic de tus usuarios',
    impl_data_subtitle: 'Solo lo mínimo para orquestar la UX. magic no toca dinero, no ve credenciales, no guarda datos sensibles.',
    impl_data_code_user_comment: 'ID opaco — no expone datos del usuario',
    impl_data_code_account_comment: 'mapping interno a la cuenta destino',
    impl_data_code_alias_comment: 'handle público (ej. @bruno)',
    impl_data_code_never_label: '// Nunca se almacena',
    impl_data_code_never_list: 'passwords · saldos · números de cuenta · transacciones · datos KYC',
    impl_data_note: 'Encriptación obligatoria vía handshake o VPN. Tu banco mantiene el control total.',
    impl_no_migration: 'Sin cambios en sistemas críticos · Sin migraciones complejas',
    impl_docs_cta: 'Ver documentación completa',
    impl_docs_url: 'mgic.me/docs',

    // 17 Regulatory
    reg_label: '17 — Regulatorio',
    reg_kicker: 'Cómo encaja magic en el marco regulatorio',
    reg_title: 'Regulación, resuelta',
    reg_1: 'magic solo integra tecnología — no es entidad financiera, no opera ni custodia fondos.',
    reg_2: 'Tu banco ejecuta los pagos y cumple con KYC/AML — magic no interviene en regulación.',
    reg_3: 'magic no almacena credenciales ni hace clearing — solo transmite instrucciones.',
    reg_4: 'Todo ocurre dentro del entorno seguro de tu banco.',
    reg_5: 'El cumplimiento regulatorio lo mantiene el banco; magic opera como capa de tecnología dentro de ese marco.',
    reg_6: 'Basado en la Ley Fintech. magic no es IFPE, transmisor de dinero ni agregador.',

    // 17b Equivalencia técnica (solo deck regulador) — el Keyboard Extension
    // ES parte del app del banco, no un componente separado.
    regeq_label: 'Equivalencia técnica',
    regeq_kicker: 'Por qué el teclado no es un componente independiente',
    regeq_title: 'El teclado ES el app del banco',
    regeq_f1_title: 'Mismo binario firmado',
    regeq_f1_desc:
      'Se distribuye dentro del mismo .ipa/.aab del banco, con el mismo Bundle ID, Team ID y certificado. No existe como app independiente en App Store o Google Play.',
    regeq_f2_title: 'Mismo ciclo de vida',
    regeq_f2_desc:
      'Se instala, actualiza y desinstala únicamente con el app del banco. No tiene actualizaciones ni revisión de tienda separadas.',
    regeq_f3_title: 'Mismo perímetro de seguridad',
    regeq_f3_desc:
      'Comparte App Group, Keychain y entitlements exclusivamente con el app del banco. Aislado del resto del sistema; no transmite datos a terceros.',
    regeq_f4_title: 'Misma responsabilidad legal',
    regeq_f4_desc:
      'Hereda los Términos de Servicio, Aviso de Privacidad y atribución legal del banco titular de la cuenta de desarrollador.',
    regeq_precedents_label: 'Misma arquitectura que precedentes que la CNBV ya acepta',
    regeq_p_widget: 'Widget de saldo',
    regeq_conclusion:
      'Un Keyboard Extension es menos invasivo que estos precedentes — debe tratarse como un módulo más del app del banco, igual que un Widget o un Notification Extension.',

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
    close_url: 'mgic.me',

    // Short-deck recap (only used by the 'short' variant)
    short_recap_label: 'En resumen',
    short_recap_kicker: '¿Qué es magic, en una sola pantalla?',
    short_recap_title: 'Un SDK dentro del app de {client}.',
    short_recap_title_regulator: 'Un SDK dentro del app del banco.',
    short_recap_1_title: 'Vive dentro del app de {client}',
    short_recap_1_title_regulator: 'Vive dentro del app del banco',
    short_recap_1_desc:
      'magic es un SDK que se integra con tu iOS, Android o React Native existente. No es una app nueva ni una migración.',
    short_recap_2_title: 'No tocamos dinero ni datos sensibles',
    short_recap_2_desc:
      'El banco mantiene custodia, autenticación, KYC/AML y la ejecución del pago. magic solo orquesta la experiencia.',
    short_recap_3_title: 'Cualquier banco, cualquier riel',
    short_recap_3_desc:
      'Funciona sobre los rieles que ya usa el banco: SPEI, Pix, SCT Inst, UPI, Bizum. Si el banco lo soporta, magic lo soporta.',
    short_recap_4_title: 'Se integra en un sprint',
    short_recap_4_desc:
      'Tres servicios que exponer (login, autorización, claim). 45 min para el primer pago de prueba; sprint completo para producción.',
    short_recap_cta: 'Hablemos del piloto',

    // Section navigator (header dropdown)
    sec_menu: 'Secciones',
    sec_intro: 'Inicio',
    sec_context: 'Contexto',
    sec_problem: 'Problema',
    sec_solution: 'Solución',
    sec_demos: 'Demos',
    sec_security: 'Seguridad',
    sec_implementation: 'Implementación',
    sec_pricing: 'Pricing',
    sec_close: 'Cierre',

    // Visitor name gate (shown once per browser before the deck loads)
    name_title: '¡Hola! 👋',
    name_subtitle:
      '¿Cómo te gustaría que te llamemos durante la presentación?',
    name_placeholder: 'Tu nombre',
    name_cta: 'Continuar',
    name_hint: 'Escribe al menos tu nombre.'
  },

  en: {
    cover_kicker: 'Payments experience layer',
    cover_title: 'magic for',
    cover_for: 'for',
    cover_regulator_audience: 'banks',
    cover_subline: 'Commercial pitch 2026',
    cover_subtitle:
      'Payments from the chat. With a tap, an emoji, or your voice. Your brand, your rails, your customers.',
    cover_msg_them: 'Can you cover dinner?',
    cover_msg_amount: "It's $300 🍽️",
    cover_claim: 'Claim from bank',
    cover_date: 'May 2026',

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
    infra_kicker: 'Real-time payments are already a global reality',
    infra_title: 'The rails exist. Experience is what differs.',
    infra_stat1: '5+',
    infra_stat1_label: 'real-time rails live in key markets',
    infra_stat2: '24/7',
    infra_stat2_label: 'instant payments available',
    infra_stat3: '+40-70%',
    infra_stat3_label: 'yearly growth in transactions',
    infra_chart_caption:
      "Real-time is real-time. What differentiates rails is the experience: Pix and Bizum proved it — the rail + slightly better UX detonates adoption.",
    infra_footnote:
      "The rail already exists in every market. What scales adoption — and what's missing — is the experience layer. magic delivers it on top of any rail.",
    rail_pix: 'Pix · Brazil',
    rail_upi: 'UPI · India',
    rail_spei: 'SPEI · Mexico',
    rail_sct_inst: 'SCT Inst · Europe',
    rail_bizum: 'Bizum · Spain',
    rail_growth: 'Adoption growth',

    wa_label: '04 — Central channel',
    wa_kicker: 'Chat is the central channel in every country',
    wa_title: 'Every market has its dominant chat. magic works in all of them.',
    wa_stat1: '5B+',
    wa_stat1_label: 'people use messaging apps worldwide',
    wa_stat2: '#1',
    wa_stat2_label: 'channel in every key market',
    wa_stat3: '8+',
    wa_stat3_label: 'chat apps natively supported by magic',
    wa_quote:
      'Most everyday financial coordination already happens in chat — but the payment has to leave the chat.',

    prob_label: '05 — The problem',
    prob_quote: "The problem isn't the rails,\nit's the experience layer.",
    prob_caption:
      'Today, sending money means leaving the chat, opening your bank app, capturing a CLABE, amount, authenticating, going back. ~90 taps for what should be one.',

    flow_label: '06 — Today',
    flow_title: 'What sending money feels like today',
    flow_today_label: 'New account (SPEI, Pix, UPI, Bizum)',
    flow_saved_label: 'Saved account (SPEI, Pix, UPI, Bizum)',
    flow_magic_label: 'With magic',
    flow_today_meta: '~90 taps · ~2 min',
    flow_saved_meta: '~35 taps · ~40 s',
    flow_magic_meta: '3 taps · ~4 s',
    flow_done: 'Payment sent',

    magic_label: '07 — The solution',
    magic_kicker: 'What is magic?',
    magic_title: 'Sending money should feel magical',
    magic_b1_title: 'SDK that lives inside your app',
    magic_b1_title_regulator: 'SDK that lives inside the bank app',
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

    kb_label: '08 — Keyboard',
    kb_kicker: 'Send money with a message',
    kb_title: "{client}'s payment keyboard, in any chat",
    kb_title_regulator: "The bank's payment keyboard, in any chat",
    kb_explanation:
      "The keyboard is part of {client}'s app. No WhatsApp integration needed — works in any messaging app.",
    kb_explanation_regulator:
      "The keyboard is part of the bank's app. No WhatsApp integration needed — works in any messaging app.",
    // Label shown in the iOS keyboard switcher inside the demo. On the
    // regulator deck it must read as a generic bank, not the regulator.
    kb_switch_bank: 'The Bank',

    // 08 Keyboard walkthrough — captions for each step (0..6)
    kbw_visitor_fallback: 'Bruno R',
    kbw_chat_contact: 'María',
    kbw_chat_via: 'via',
    kbw_chat_msg1: 'Can you cover lunch? 🍣',
    kbw_chat_msg2: "It's $50 MXN",
    kbw_restart_hint: 'Start over (clears the conversation)',
    kbw_login_title: 'Signing in to {client}',
    kbw_login_sub: "Authentication inside the bank's app",
    kbw_success_title: 'Link generated successfully',
    kbw_step_0:
      'A WhatsApp message asks for a transfer.',
    kbw_step_1:
      'Keyboards are switched and the {client} keyboard is picked.',
    kbw_step_2:
      "The magic keyboard activates, embedded in the bank's app. Works in any messaging app without touching its code.",
    kbw_step_3:
      'The keyboard opens — it lives inside the {client} app. The amount is typed in.',
    kbw_step_4:
      "Signing in to {client}. Same session and authorisation as the app.",
    kbw_step_5:
      'A dynamic token is issued as a second authorisation factor, bound to the device.',
    kbw_step_6:
      'Payment link generated and sent in the conversation. One interaction, without leaving the chat.',
    kbw_loader_title: 'Generating payment link…',
    kbw_loader_sub: 'Dynamic token · bank-signed',

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
    claim_info_saved_title: 'Once, ready forever',
    claim_info_saved_desc:
      'The account is saved securely in the browser. Next link is claimed with a single tap.',
    claim_info_acq_title: 'Acquisition channel',
    claim_info_acq_desc:
      "If the recipient isn't a customer, they see a banner to download your app — you acquire users every time a customer sends money.",

    tap_label: '11 — Tap',
    tap_kicker: 'Payments with one touch',
    tap_title: 'Send money with a tap',
    tap_caption:
      'NFC between two phones. The link travels through the air. The recipient claims it like any payment link — no bank app needed.',

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
    sec_2_title: 'Same auth as the {client} app',
    sec_2_title_regulator: 'Same auth as the bank app',
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
    ben_title: 'Benefits for {client}',
    ben_title_regulator: 'Benefits for banks',
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
    impl_service1: 'Login',
    impl_service1_desc: 'Pre-validate credentials · returns sessionToken.',
    impl_service2: 'Authorize',
    impl_service2_desc: 'Approve transaction after biometrics · returns txCode.',
    impl_service3: 'Claim',
    impl_service3_desc: 'Execute the real transfer over your rail (SPEI/DiMo).',
    impl_data_title: 'What magic stores about your users',
    impl_data_subtitle: "The bare minimum to orchestrate the UX. magic doesn't touch money, see credentials, or store sensitive data.",
    impl_data_code_user_comment: 'opaque ID — no PII exposed',
    impl_data_code_account_comment: 'internal mapping to destination account',
    impl_data_code_alias_comment: 'public handle (e.g. @bruno)',
    impl_data_code_never_label: '// Never stored',
    impl_data_code_never_list: 'passwords · balances · account numbers · transactions · KYC data',
    impl_data_note: 'Mandatory encryption via handshake or VPN. Your bank stays in full control.',
    impl_no_migration: 'No changes to critical systems · No complex migrations',
    impl_docs_cta: 'Read full documentation',
    impl_docs_url: 'mgic.me/docs',

    reg_label: '17 — Regulatory',
    reg_kicker: 'How magic fits into the regulatory framework',
    reg_title: 'Regulation, solved',
    reg_1:
      "magic only integrates technology — it isn't a financial entity, doesn't operate or hold funds.",
    reg_2: "Your bank executes payments and complies with KYC/AML — magic doesn't intervene.",
    reg_3: "magic doesn't store credentials or do clearing — only transmits instructions.",
    reg_4: "Everything happens within your bank's secure environment.",
    reg_5: 'Regulatory compliance sits with the bank; magic operates as a technology layer within that framework.',
    reg_6: 'Based on the Fintech Law. magic is not an IFPE, money transmitter, or aggregator.',

    // 17b Technical equivalence (regulator deck only) — the Keyboard
    // Extension IS part of the bank app, not a separate component.
    regeq_label: 'Technical equivalence',
    regeq_kicker: 'Why the keyboard is not a standalone component',
    regeq_title: 'The keyboard IS the bank app',
    regeq_f1_title: 'Same signed binary',
    regeq_f1_desc:
      "Ships inside the bank's own .ipa/.aab, with the same Bundle ID, Team ID and certificate. It does not exist as a standalone app on the App Store or Google Play.",
    regeq_f2_title: 'Same lifecycle',
    regeq_f2_desc:
      'Installed, updated and removed only with the bank app. It has no separate updates or store review.',
    regeq_f3_title: 'Same security perimeter',
    regeq_f3_desc:
      'Shares App Group, Keychain and entitlements exclusively with the bank app. Isolated from the rest of the system; it sends no data to third parties.',
    regeq_f4_title: 'Same legal responsibility',
    regeq_f4_desc:
      'Inherits the Terms of Service, Privacy Notice and legal attribution of the bank that owns the developer account.',
    regeq_precedents_label: 'Same architecture as precedents the CNBV already accepts',
    regeq_p_widget: 'Balance widget',
    regeq_conclusion:
      'A Keyboard Extension is less invasive than these precedents — it should be treated as one more module of the bank app, just like a Widget or a Notification Extension.',

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
    close_url: 'mgic.me',

    short_recap_label: 'In short',
    short_recap_kicker: 'What is magic, on a single screen?',
    short_recap_title: 'An SDK inside the {client} app.',
    short_recap_title_regulator: "An SDK inside the bank's app.",
    short_recap_1_title: 'Lives inside the {client} app',
    short_recap_1_title_regulator: "Lives inside the bank's app",
    short_recap_1_desc:
      'magic is an SDK that drops into your existing iOS, Android or React Native app. Not a new app, not a migration.',
    short_recap_2_title: "We don't touch money or sensitive data",
    short_recap_2_desc:
      'The bank keeps custody, authentication, KYC/AML, and the actual payment execution. magic only orchestrates the experience.',
    short_recap_3_title: 'Any bank, any rail',
    short_recap_3_desc:
      'Runs on the rails the bank already uses — SPEI, Pix, SCT Inst, UPI, Bizum. If the bank supports it, magic supports it.',
    short_recap_4_title: 'Ships in one sprint',
    short_recap_4_desc:
      'Three services to expose (login, authorize, claim). 45 minutes to a first test payment; one sprint to production.',
    short_recap_cta: "Let's talk about a pilot",

    // Section navigator (header dropdown)
    sec_menu: 'Sections',
    sec_intro: 'Intro',
    sec_context: 'Context',
    sec_problem: 'Problem',
    sec_solution: 'Solution',
    sec_demos: 'Demos',
    sec_security: 'Security',
    sec_implementation: 'Implementation',
    sec_pricing: 'Pricing',
    sec_close: 'Closing',

    name_title: 'Hi there! 👋',
    name_subtitle: 'How would you like us to address you during the deck?',
    name_placeholder: 'Your first name',
    name_cta: 'Continue',
    name_hint: 'Please type at least your first name.'
  }
} as const;

export type StringKey = keyof typeof i18n.es;
