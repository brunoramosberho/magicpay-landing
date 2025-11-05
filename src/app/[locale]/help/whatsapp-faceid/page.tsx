import {HeroHeader} from "@/components/header";
import Footer from "@/components/footer";
import {Button} from "@/components/ui/button";
import type {Metadata} from "next";
import type {ReactNode} from "react";

type Step = {
  label: string;
  title: string;
  description: ReactNode;
  bullets?: ReactNode[];
  footnote?: ReactNode;
};

type Highlight = {
  title: string;
  description: ReactNode;
};

type Section = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  steps?: Step[];
  highlights?: Highlight[];
  checklist?: ReactNode[];
  note?: ReactNode;
};

type Attachment = {
  title: string;
  description: ReactNode;
  suggestions: string[];
};

type SupportBlock = {
  title: string;
  description: ReactNode;
  ctaLabel: string;
  ctaHref: string;
};

type LocaleContent = {
  heroBadge: string;
  pageTitle: string;
  intro: ReactNode;
  overview: {
    title: string;
    paragraphs: ReactNode[];
    checklist: ReactNode[];
    quickTipTitle: string;
    quickTipDescription: ReactNode;
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
    intro: (
      <>
        magic es el teclado que abre en cualquier chat para enviar ligas de pago sin salir de la conversación. Si en WhatsApp activaste <span className="font-medium">Requerir Face ID</span>, el teclado se corta cuando avanzas. Aquí lo resolvemos.
      </>
    ),
    overview: {
      title: "Solución de un vistazo",
      paragraphs: [
        (
          <>
            WhatsApp saca a magic porque en <span className="font-medium">Privacidad → Bloqueo de aplicación</span> dejaste activado <span className="font-medium">Requerir Face ID</span>.
          </>
        ),
        (
          <>
            Al apagarlo, magic se mantiene abierto. Luego iOS puede seguir pidiendo Face ID cuando abres WhatsApp desde el home, así que no pierdes seguridad.
          </>
        ),
      ],
      checklist: [
        "iPhone con Face ID funcional",
        "WhatsApp actualizado (no beta)",
        "Código de desbloqueo a la mano",
      ],
      quickTipTitle: "Paso rápido",
      quickTipDescription: (
        <>
          Ve a <span className="font-medium">WhatsApp → Ajustes → Privacidad → Bloqueo de aplicación</span> y apaga <span className="font-medium">Requerir Face ID</span>. Después, desde el home, mantén presionado el ícono y toca <span className="font-medium">Solicitar Face ID</span> para que iOS lo pida al abrir la app.
        </>
      ),
    },
    sections: [
      {
        eyebrow: "Paso 1",
        title: "Apaga Face ID dentro de WhatsApp",
        description: (
          <>
            Es el detonador del cierre. Desactívalo y tu teclado deja de desaparecer.
          </>
        ),
        steps: [
          {
            label: "1",
            title: "Entra a Ajustes",
            description: (
              <>
                Entra a <span className="font-medium">Configuración</span> (esquina inferior derecha).
              </>
            ),
          },
          {
            label: "2",
            title: "Abre Privacidad → Bloqueo de aplicación",
            description: (
              <>
                Baja hasta <span className="font-medium">Bloqueo de aplicación</span>.
              </>
            ),
          },
          {
            label: "3",
            title: "Apaga Requerir Face ID",
            description: (
              <>
                Confirma con Face ID o código y deja el switch en <span className="font-medium">off</span>.
              </>
            ),
            footnote: "Si tenías un temporizador (1 minuto, etc.), también se apaga.",
          },
        ],
        note: "Vuelve a un chat: el teclado magic ya no se cierra al avanzar.",
      },
      {
        eyebrow: "Paso 2",
        title: "Deja que iOS pida Face ID",
        description: (
          <>
            Mantienes seguridad sin que WhatsApp cierre el teclado.
          </>
        ),
        steps: [
          {
            label: "1",
            title: "Ve al home",
            description: "Cierra WhatsApp de forma normal (no hace falta forzarla).",
          },
          {
            label: "2",
            title: "Mantén presionado el ícono",
            description: (
              <>
                Elige <span className="font-medium">Solicitar Face ID</span> en el menú. Ahora la protección depende de iOS.
              </>
            ),
            bullets: [
              "Si no aparece, revisa Ajustes → Face ID y código.",
            ],
          },
          {
            label: "3",
            title: "Confirma",
            description: "Acepta la alerta. Face ID se pedirá solo al abrir WhatsApp desde el icono.",
          },
        ],
        note: "Para quitarlo, repite el gesto y toca “Dejar de solicitar Face ID”.",
      },
      {
        eyebrow: "Paso 3",
        title: "Valida y comparte",
        description: "Haz una prueba y comparte esta guía con quien lo necesite.",
        highlights: [
          {
            title: "Haz una prueba en un chat real",
            description: "Abre un chat, lanza el teclado y verifica que permanezca visible.",
          },
          {
            title: "Crea un mensaje guía",
            description: "Guarda esta solución como respuesta rápida en tu CRM o notas.",
          },
          {
            title: "Documenta con evidencias",
            description: "Si puedes, toma un screenshot o video corto del antes y después.",
          },
        ],
      },
    ],
    attachments: {
      title: "¿Vas a agregar imágenes o videos?",
      description:
        "Si agregas medios, súbelos a la librería y vincúlalos aquí.",
      suggestions: [
        "Captura de WhatsApp mostrando la ruta Ajustes → Privacidad → Bloqueo de aplicación",
        "Screenshot del interruptor \"Requerir Face ID\" desactivado",
        "Video corto (10-15 s) demostrando cómo se solicita Face ID desde el home",
      ],
    },
    support: {
      title: "¿Necesitas que lo revisemos contigo?",
      description:
        "Si quieres que lo revisemos contigo en vivo, escríbenos y te ayudamos al momento.",
      ctaLabel: "Escríbenos a soporte@mgic.me",
      ctaHref: "mailto:soporte@mgic.me",
    },
  },
  en: {
    heroBadge: "Help Center",
    pageTitle: "WhatsApp closes the keyboard when Face ID appears",
    intro: (
      <>
        magic is the keyboard you open in any chat to send payment links without leaving the conversation. If WhatsApp has <span className="font-medium">Require Face ID</span> on, it cuts the flow. Let’s fix it.
      </>
    ),
    overview: {
      title: "At a glance",
      paragraphs: [
        (
          <>
            WhatsApp kicks out magic because <span className="font-medium">Settings → Privacy → App Lock → Require Face ID</span> stays enabled.
          </>
        ),
        (
          <>
            Turn it off so magic stays open. Then iOS can still request Face ID when you launch WhatsApp from the home screen—security intact.
          </>
        ),
      ],
      checklist: [
        "iPhone with Face ID working",
        "Latest WhatsApp (not beta)",
        "Device passcode nearby",
      ],
      quickTipTitle: "Quick fix",
      quickTipDescription: (
        <>
          Go to <span className="font-medium">WhatsApp → Settings → Privacy → App Lock</span>, switch off <span className="font-medium">Require Face ID</span>, then long-press the icon on the home screen and tap <span className="font-medium">Require Face ID</span> so iOS asks for it when opening the app.
        </>
      ),
    },
    sections: [
      {
        eyebrow: "Step 1",
        title: "Switch off Face ID inside WhatsApp",
        description: "That toggle is what closes the keyboard. Turn it off and you’re done.",
        steps: [
          {
            label: "1",
            title: "Open Settings",
            description: (
              <>
                Tap <span className="font-medium">Settings</span> in the bottom-right corner.
              </>
            ),
          },
          {
            label: "2",
            title: "Go to Privacy → App Lock",
            description: (
              <>
                Scroll to <span className="font-medium">App Lock</span>.
              </>
            ),
          },
          {
            label: "3",
            title: "Turn off Require Face ID",
            description: (
              <>
                Confirm with Face ID or passcode and leave the switch <span className="font-medium">off</span>.
              </>
            ),
            footnote: "Any timeout you set (After 1 minute, etc.) is removed too.",
          },
        ],
        note: "Open a chat again—the keyboard should stay visible.",
      },
      {
        eyebrow: "Step 2",
        title: "Let iOS handle Face ID",
        description: "You keep security, and WhatsApp stops closing the keyboard.",
        steps: [
          {
            label: "1",
            title: "Go back home",
            description: "Leave WhatsApp normally; no force quit needed.",
          },
          {
            label: "2",
            title: "Long-press WhatsApp",
            description: (
              <>
                Pick <span className="font-medium">Require Face ID</span> in the menu so iOS owns the protection.
              </>
            ),
            bullets: [
              "If you can’t see it, check Settings → Face ID & Passcode.",
            ],
          },
          {
            label: "3",
            title: "Confirm",
            description: "Approve the alert. Face ID appears only when opening WhatsApp from the icon.",
          },
        ],
        note: "To stop it later, repeat the gesture and choose “Don’t Require Face ID”.",
      },
      {
        eyebrow: "Step 3",
        title: "Test and share",
        description: "Try it once and keep this fix handy for anyone who needs it.",
        highlights: [
          {
            title: "Run a live chat test",
            description: "Try it in a real chat and confirm the keyboard stays in place.",
          },
          {
            title: "Save a ready-to-send reply",
            description: "Store this flow as a canned reply in Notes, CRM, or help desk.",
          },
          {
            title: "Capture evidence",
            description: "Grab a quick screenshot or clip of the before/after if you can.",
          },
        ],
      },
    ],
    attachments: {
      title: "Planning to add images or videos?",
      description:
        "Add visuals later by uploading them to the library and linking them here.",
      suggestions: [
        "Screenshot of WhatsApp showing Settings → Privacy → App Lock",
        "Image of the \"Require Face ID\" toggle turned off",
        "10–15 second clip demonstrating how to enable Face ID from the home screen",
      ],
    },
    support: {
      title: "Need a hand double-checking?",
      description:
        "Want us to double-check it live? Drop us a line and we’ll jump in.",
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


