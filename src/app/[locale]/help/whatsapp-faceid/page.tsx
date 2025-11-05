import {HeroHeader} from "@/components/header";
import Footer from "@/components/footer";
import {Button} from "@/components/ui/button";
import type {Metadata} from "next";

type Step = {
  label: string;
  title: string;
  description: string;
  bullets?: string[];
  footnote?: string;
};

type Highlight = {
  title: string;
  description: string;
};

type Section = {
  eyebrow?: string;
  title: string;
  description?: string;
  steps?: Step[];
  highlights?: Highlight[];
  checklist?: string[];
  note?: string;
};

type Attachment = {
  title: string;
  description: string;
  suggestions: string[];
};

type SupportBlock = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type LocaleContent = {
  heroBadge: string;
  pageTitle: string;
  intro: string;
  overview: {
    title: string;
    paragraphs: string[];
    checklist: string[];
    quickTipTitle: string;
    quickTipDescription: string;
  };
  sections: Section[];
  attachments: Attachment;
  support: SupportBlock;
};

const metadataByLocale: Record<string, Metadata> = {
  es: {
    title: "WhatsApp Face ID | magicPay Ayuda",
    description:
      "Guía paso a paso para resolver el cierre del teclado cuando WhatsApp solicita Face ID. Aprende cómo desactivar el bloqueo dentro de WhatsApp y cómo activar Face ID desde iOS.",
  },
  en: {
    title: "WhatsApp Face ID | magicPay Help",
    description:
      "Step-by-step guide to prevent the keyboard from closing when WhatsApp requests Face ID. Learn how to disable Face ID App Lock inside WhatsApp and how to enable it from iOS.",
  },
};

const content: Record<"en" | "es", LocaleContent> = {
  es: {
    heroBadge: "Centro de ayuda",
    pageTitle: "WhatsApp cierra el teclado al pedir Face ID",
    intro:
      "Si el teclado de magicPay desaparece cada vez que WhatsApp pide Face ID, es porque el bloqueo con Face ID está activado dentro de la app. Aquí te guiamos para desactivarlo (sin perder seguridad) y volver a escribir con normalidad.",
    overview: {
      title: "Identifica el problema en menos de un minuto",
      paragraphs: [
        "WhatsApp tiene un bloqueo adicional dentro de Ajustes → Privacidad → Bloqueo de aplicación. Cuando está activo, cualquier app superpuesta (como nuestro teclado) se cierra al pedir Face ID.",
        "La solución es desactivar ese bloqueo interno y, en su lugar, usar la protección del sistema operativo. Así mantienes Face ID al abrir WhatsApp desde iOS sin interrumpir el teclado de magicPay.",
      ],
      checklist: [
        "Asegúrate de tener tu iPhone actualizado y con Face ID configurado",
        "Confirma que nadie más esté usando la versión beta de WhatsApp en tu dispositivo",
        "Ten a la mano tu código de desbloqueo por si el sistema lo solicita",
      ],
      quickTipTitle: "Solución express",
      quickTipDescription:
        "Ve directo a WhatsApp → Ajustes → Privacidad → Bloqueo de aplicación y apaga \"Requerir Face ID\". Después regresa al home, mantén presionado el ícono de WhatsApp y elige \"Solicitar Face ID\" para que iOS lo pida solo al abrir la app.",
    },
    sections: [
      {
        eyebrow: "Paso 1",
        title: "Desactiva el bloqueo con Face ID dentro de WhatsApp",
        description:
          "Este ajuste solo vive dentro de WhatsApp. Al apagarlo, tu teclado ya no se cerrará de forma inesperada.",
        steps: [
          {
            label: "1",
            title: "Abre WhatsApp y entra a Ajustes",
            description:
              "En iPhone, toca la pestaña \"Configuración\" en la parte inferior derecha. Si tu WhatsApp está en español, verás \"Configuración\"; en inglés aparece como \"Settings\".",
            bullets: [
              "Verifica que estás en la cuenta correcta si usas WhatsApp Business",
              "Asegúrate de estar conectado a internet para que se guarden los cambios",
            ],
          },
          {
            label: "2",
            title: "Ingresa a Privacidad → Bloqueo de aplicación",
            description:
              "Busca la opción \"Privacidad\" y desliza hasta \"Bloqueo de aplicación\" (en inglés \"Privacy → App Lock\").",
          },
          {
            label: "3",
            title: "Apaga \"Requerir Face ID\"",
            description:
              "Verás un interruptor que dice \"Requerir Face ID\". Desactívalo. El sistema te pedirá Face ID o tu código para confirmar.",
            footnote:
              "Nota: Si tenías configurado un tiempo de espera (por ejemplo, \"después de 1 minuto\"), también quedará deshabilitado.",
          },
        ],
        note:
          "Después de este paso, prueba abrir el teclado de magicPay dentro de un chat: ya no debería cerrarse al instante.",
      },
      {
        eyebrow: "Paso 2",
        title: "Activa Face ID desde iOS para mantener seguridad",
        description:
          "Seguiremos usando Face ID, pero ahora controlado por el sistema, que es compatible con el teclado de magicPay.",
        steps: [
          {
            label: "1",
            title: "Regresa al home de tu iPhone",
            description:
              "Cierra WhatsApp o deslízala hacia arriba. No hace falta forzar el cierre en la multitarea.",
          },
          {
            label: "2",
            title: "Mantén presionado el ícono de WhatsApp",
            description:
              "Al aparecer el menú contextual, selecciona \"Solicitar Face ID\". Esto activa la protección nativa de iOS al abrir la app.",
            bullets: [
              "Si no ves la opción, revisa que Face ID esté configurado en Ajustes → Face ID y código",
              "Para WhatsApp Business, asegúrate de haber actualizado a la última versión",
            ],
          },
          {
            label: "3",
            title: "Confirma el mensaje",
            description:
              "iOS mostrará una confirmación. A partir de ahora, cada vez que abras WhatsApp desde el icono, pedirá Face ID antes de mostrar tus chats.",
          },
        ],
        note:
          "Puedes desactivar esta opción cuando quieras repitiendo el mismo proceso y eligiendo \"Dejar de solicitar Face ID\".",
      },
      {
        eyebrow: "Paso 3",
        title: "Prueba y personaliza tu experiencia",
        description:
          "Verifica que todo funcione y deja notas para tu equipo o clientes.",
        highlights: [
          {
            title: "Haz una prueba en un chat real",
            description:
              "Abre un chat con alguien de confianza, lanza el teclado de magicPay y confirma que permanece en pantalla mientras Face ID se verifica solo al entrar a la app.",
          },
          {
            title: "Crea un mensaje guía",
            description:
              "Guarda un texto en Notas o en tu CRM con esta guía para compartirla rápido con usuarios que reporten el mismo problema.",
          },
          {
            title: "Documenta con evidencias",
            description:
              "Captura pantalla o graba un video corto del antes y después. Te será útil para soporte interno y para actualizar este tutorial.",
          },
        ],
      },
    ],
    attachments: {
      title: "¿Vas a agregar imágenes o videos?",
      description:
        "Estos recursos ayudan a que el tutorial sea aún más claro. Cuando los tengas, súbelos a la librería y enlázalos aquí.",
      suggestions: [
        "Captura de WhatsApp mostrando la ruta Ajustes → Privacidad → Bloqueo de aplicación",
        "Screenshot del interruptor \"Requerir Face ID\" desactivado",
        "Video corto (10-15 s) demostrando cómo se solicita Face ID desde el home",
      ],
    },
    support: {
      title: "¿Necesitas que lo revisemos contigo?",
      description:
        "Nuestro equipo puede acompañarte por videollamada o chat para validar que el flujo quedó perfecto.",
      ctaLabel: "Escríbenos a soporte@mgic.me",
      ctaHref: "mailto:soporte@mgic.me",
    },
  },
  en: {
    heroBadge: "Help Center",
    pageTitle: "WhatsApp closes the keyboard when Face ID appears",
    intro:
      "If the magicPay keyboard disappears every time WhatsApp asks for Face ID, it means WhatsApp’s in-app Face ID lock is on. Follow these steps to turn it off (without losing security) and keep typing smoothly.",
    overview: {
      title: "Understand the issue in under a minute",
      paragraphs: [
        "WhatsApp includes an extra App Lock under Settings → Privacy → App Lock. When it’s enabled, any overlay app (like our keyboard) gets dismissed as soon as Face ID pops up.",
        "The fix is to disable that internal lock and rely on iOS instead. This way you still get Face ID when launching WhatsApp, and the magicPay keyboard stays open.",
      ],
      checklist: [
        "Make sure your iPhone is up to date and Face ID works on the home screen",
        "Confirm you’re not using the WhatsApp beta on this device",
        "Keep your device passcode handy in case iOS asks for it",
      ],
      quickTipTitle: "Quick fix",
      quickTipDescription:
        "Go straight to WhatsApp → Settings → Privacy → App Lock and turn off \"Require Face ID\". Then return to the home screen, long-press WhatsApp, and choose \"Require Face ID\" so iOS handles the protection when opening the app.",
    },
    sections: [
      {
        eyebrow: "Step 1",
        title: "Turn off WhatsApp’s in-app Face ID lock",
        description:
          "This toggle lives only inside WhatsApp. Once it’s disabled, the keyboard will stay put.",
        steps: [
          {
            label: "1",
            title: "Open WhatsApp and go to Settings",
            description:
              "On iPhone, tap the \"Settings\" tab in the bottom-right corner. If your WhatsApp is in Spanish it will read \"Configuración\".",
            bullets: [
              "Double-check you’re in the right account if you use WhatsApp Business",
              "Stay connected to the internet so the change is saved",
            ],
          },
          {
            label: "2",
            title: "Tap Privacy → App Lock",
            description:
              "Scroll until you find \"App Lock\" inside the Privacy section.",
          },
          {
            label: "3",
            title: "Switch off \"Require Face ID\"",
            description:
              "You’ll see a toggle called \"Require Face ID\". Turn it off. WhatsApp will ask for Face ID or your passcode to confirm.",
            footnote:
              "If you previously set a timeout (for example \"After 1 minute\"), it will be disabled as well.",
          },
        ],
        note:
          "Now open the magicPay keyboard in any chat. It should remain visible instead of closing immediately.",
      },
      {
        eyebrow: "Step 2",
        title: "Let iOS request Face ID when launching WhatsApp",
        description:
          "We’ll keep Face ID, but managed by iOS so it plays nicely with the keyboard.",
        steps: [
          {
            label: "1",
            title: "Return to your iPhone home screen",
            description:
              "Close WhatsApp or swipe up to leave it. No need to force quit.",
          },
          {
            label: "2",
            title: "Long-press the WhatsApp icon",
            description:
              "When the quick actions menu appears, tap \"Require Face ID\". This enables iOS-level protection for the app.",
            bullets: [
              "If the option is missing, check Settings → Face ID & Passcode to verify Face ID is set up",
              "Update WhatsApp Business if you use that version",
            ],
          },
          {
            label: "3",
            title: "Approve the confirmation",
            description:
              "iOS will display a confirmation. From now on, you’ll see Face ID before the chat list whenever you open WhatsApp from the icon.",
          },
        ],
        note:
          "To disable it later, repeat the gesture and choose \"Don’t Require Face ID\".",
      },
      {
        eyebrow: "Step 3",
        title: "Test and share the flow",
        description:
          "Make sure everything works and document it for your team.",
        highlights: [
          {
            title: "Run a live chat test",
            description:
              "Open a chat with a teammate, launch the magicPay keyboard, and confirm it stays visible while Face ID only appears when opening the app.",
          },
          {
            title: "Save a ready-to-send reply",
            description:
              "Create a canned response in Notes, your CRM, or your help desk so you can share this fix instantly with anyone who reports it.",
          },
          {
            title: "Capture evidence",
            description:
              "Take screenshots or record a short clip of the before/after. It’s useful for internal training and for updating this tutorial with visuals.",
          },
        ],
      },
    ],
    attachments: {
      title: "Planning to add images or videos?",
      description:
        "Visuals make this walkthrough even clearer. Once they’re ready, upload them to the media library and link them here.",
      suggestions: [
        "Screenshot of WhatsApp showing Settings → Privacy → App Lock",
        "Image of the \"Require Face ID\" toggle turned off",
        "10–15 second clip demonstrating how to enable Face ID from the home screen",
      ],
    },
    support: {
      title: "Need a hand double-checking?",
      description:
        "Our team can hop on a quick call or chat to make sure the flow works perfectly for you.",
      ctaLabel: "Email us at support@mgic.me",
      ctaHref: "mailto:support@mgic.me",
    },
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  return metadataByLocale[locale] ?? metadataByLocale.en;
}

export default async function WhatsAppFaceIDHelpPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const normalizedLocale = (locale in content ? locale : "en") as keyof typeof content;
  const copy = content[normalizedLocale];

  return (
    <>
      <HeroHeader />
      <main className="px-6 pt-32 pb-24 lg:pb-32">
        <article className="mx-auto max-w-5xl space-y-12">
          <header className="space-y-6 text-center sm:text-left">
            <span className="inline-flex items-center justify-center rounded-full border border-border px-4 py-1 text-xs font-medium uppercase tracking-wide text-foreground/70">
              {copy.heroBadge}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {copy.pageTitle}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">
              {copy.intro}
            </p>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className="space-y-6 rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground">
                {copy.overview.title}
              </h2>
              {copy.overview.paragraphs.map((paragraph, index) => (
                <p key={`overview-paragraph-${index}`} className="text-base leading-7 text-foreground/80">
                  {paragraph}
                </p>
              ))}
              <div className="rounded-2xl border border-dashed border-border/80 bg-background/60 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                  Checklist
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  {copy.overview.checklist.map((item, index) => (
                    <li key={`checklist-${index}`} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-emerald-500/20 via-background to-background p-8">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground/70">
                  {copy.overview.quickTipTitle}
                </h3>
                <p className="text-base leading-7 text-foreground/80">
                  {copy.overview.quickTipDescription}
                </p>
              </div>
              <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-900">
                <p>
                  {normalizedLocale === "es"
                    ? "Tip: Marca este tutorial como favorito en tu navegador para compartirlo con usuarios cuando lo necesites."
                    : "Tip: Bookmark this tutorial so you can share it quickly whenever someone needs it."}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            {copy.sections.map((section, sectionIndex) => (
              <div
                key={`section-${sectionIndex}`}
                className="space-y-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm"
              >
                <div className="space-y-3">
                  {section.eyebrow ? (
                    <span className="inline-flex items-center justify-center rounded-full border border-border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-foreground/60">
                      {section.eyebrow}
                    </span>
                  ) : null}
                  <h2 className="text-2xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  {section.description ? (
                    <p className="text-base leading-7 text-foreground/80">
                      {section.description}
                    </p>
                  ) : null}
                </div>

                {section.steps ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.steps.map((step, stepIndex) => (
                      <div
                        key={`section-${sectionIndex}-step-${stepIndex}`}
                        className="flex h-full flex-col rounded-2xl border border-border bg-background/60 p-6"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold text-foreground">
                            {step.label}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-foreground/80">
                          {step.description}
                        </p>
                        {step.bullets ? (
                          <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                            {step.bullets.map((bullet, bulletIndex) => (
                              <li key={`section-${sectionIndex}-step-${stepIndex}-bullet-${bulletIndex}`} className="flex gap-2">
                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-foreground/50" aria-hidden />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {step.footnote ? (
                          <p className="mt-4 text-xs text-foreground/60">
                            {step.footnote}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.highlights ? (
                  <div className="grid gap-4 md:grid-cols-3">
                    {section.highlights.map((highlight, highlightIndex) => (
                      <div
                        key={`section-${sectionIndex}-highlight-${highlightIndex}`}
                        className="rounded-2xl border border-border bg-background/60 p-6"
                      >
                        <h3 className="text-lg font-semibold text-foreground">
                          {highlight.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-foreground/70">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                {section.checklist ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {section.checklist.map((item, checklistIndex) => (
                      <li
                        key={`section-${sectionIndex}-checklist-${checklistIndex}`}
                        className="flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-4 text-sm text-foreground/70"
                      >
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.note ? (
                  <p className="rounded-2xl border border-dashed border-border/80 bg-background/80 p-4 text-sm text-foreground/70">
                    {section.note}
                  </p>
                ) : null}
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-3xl border border-border bg-muted/40 p-8">
            <h2 className="text-2xl font-semibold text-foreground">
              {copy.attachments.title}
            </h2>
            <p className="text-base leading-7 text-foreground/80">
              {copy.attachments.description}
            </p>
            <ul className="space-y-3 text-sm text-foreground/70">
              {copy.attachments.suggestions.map((suggestion, index) => (
                <li key={`attachment-${index}`} className="flex gap-2">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/40" aria-hidden />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">
                {copy.support.title}
              </h2>
              <p className="text-base leading-7 text-foreground/80">
                {copy.support.description}
              </p>
            </div>
            <Button asChild size="lg" className="self-start whitespace-nowrap">
              <a href={copy.support.ctaHref}>{copy.support.ctaLabel}</a>
            </Button>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}


