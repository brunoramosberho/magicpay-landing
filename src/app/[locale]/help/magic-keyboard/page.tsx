import {HeroHeader} from "@/components/header";
import Footer from "@/components/footer";
import {Button} from "@/components/ui/button";
import type {Metadata} from "next";
import type {ReactNode} from "react";

type Step = {
  label: string;
  title: string;
  description: ReactNode;
};

type Section = {
  title: string;
  description?: ReactNode;
  steps?: Step[];
  items?: ReactNode[];
};

type Tip = {
  title: string;
  description: ReactNode;
  steps: ReactNode[];
};

type SupportBlock = {
  title: string;
  description: ReactNode;
  ctaLabel: string;
  ctaHref: string;
};

type LocaleContent = {
  heroBadge: string;
  heroTitle: string;
  heroIntro: ReactNode;
  overview: {
    title: string;
    bullets: ReactNode[];
  };
  sections: Section[];
  tip: Tip;
  support: SupportBlock;
};

const metadataByLocale: Record<string, Metadata> = {
  es: {
    title: "Cómo funciona el teclado ∗ magic | magicPay Ayuda",
    description:
      "Aprende en minutos cómo opera el teclado ∗ magic, por qué ves ligas de demostración y cómo activar Acceso Completo para enviar pagos reales.",
  },
  en: {
    title: "How the ∗ magic keyboard works | magicPay Help",
    description:
      "Understand the ∗ magic keyboard, why you might see demo links, and how to enable Full Access to send real payment links.",
  },
};

const content: Record<"en" | "es", LocaleContent> = {
  es: {
    heroBadge: "Centro de ayuda",
    heroTitle: "¿Cómo funciona el teclado ∗ magic?",
    heroIntro: (
      <>
        Si ves una liga de demostración es porque iOS todavía no dio <span className="font-medium">Acceso Completo</span> al teclado. Aquí te contamos qué hace <span className="font-medium">∗ magic</span> y cómo habilitarlo.
      </>
    ),
    overview: {
      title: "Lo esencial",
      bullets: [
        (
          <>
            <span className="font-medium">∗ magic</span> vive dentro de la app de tu banco y genera ligas de pago sin salir del chat.
          </>
        ),
        (
          <>
            Las ligas reales se autentican igual que una transferencia hecha desde tu banca móvil.
          </>
        ),
        (
          <>
            El dinero se mueve cuando la otra persona reclama la liga, no antes.
          </>
        ),
      ],
    },
    sections: [
      {
        title: "Cuando envías una liga real",
        description: "Así luce el flujo completo con Acceso Completo activado:",
        steps: [
          {
            label: "1",
            title: "Elige el monto en ∗ magic",
            description: (
              <>
                Abre el teclado, selecciona <span className="font-medium">Enviar</span> y define el monto sin salir de la conversación.
              </>
            ),
          },
          {
            label: "2",
            title: "Comparte la liga",
            description: (
              <>
                El mensaje incluye una <span className="font-medium">liga de pago</span> lista para que tu contacto la abra.
              </>
            ),
          },
          {
            label: "3",
            title: "La otra persona cobra",
            description: (
              <>
                Introduce los datos de su cuenta y la transferencia se ejecuta al instante.
              </>
            ),
          },
        ],
      },
      {
        title: "Si ves una liga de demostración",
        items: [
          (
            <>
              iOS no ha permitido <span className="font-medium">Acceso Completo</span>, por eso ∗ magic solo envía un ejemplo.
            </>
          ),
          "El mensaje describe cómo funcionaría, pero no mueve dinero real.",
          "Puedes usarlo para mostrar el flujo a otra persona antes de habilitarlo.",
        ],
      },
      {
        title: "Seguridad siempre encendida",
        items: [
          (
            <>
              Generar la liga requiere las mismas <span className="font-medium">autenticaciones</span> que tu app bancaria.
            </>
          ),
          (
            <>
              El dinero sale cuando alguien reclama la liga; hasta entonces permanece en tu cuenta.
            </>
          ),
          (
            <>
              Cada liga dura <span className="font-medium">24 horas</span> y puedes cancelarla en cualquier momento.
            </>
          ),
          (
            <>
              Dar <span className="font-medium">Acceso Completo</span> no permite que ∗ magic lea tus conversaciones; solo habilita la creación de ligas.
            </>
          ),
        ],
      },
    ],
    tip: {
      title: "Activa Acceso Completo en iOS",
      description: "Solo lo haces una vez y listo.",
      steps: [
        (
          <>
            Abre <span className="font-medium">Ajustes → General → Teclado → Teclados</span>.
          </>
        ),
        (
          <>
            Toca <span className="font-medium">∗ magic</span> y activa <span className="font-medium">Permitir acceso completo</span>.
          </>
        ),
        "Confirma el aviso de iOS. Vuelve al chat y envía una liga real.",
      ],
    },
    support: {
      title: "¿Necesitas ayuda extra?",
      description: "Nuestro equipo puede acompañarte paso a paso mientras lo habilitas.",
      ctaLabel: "Escríbenos a soporte@mgic.me",
      ctaHref: "mailto:soporte@mgic.me",
    },
  },
  en: {
    heroBadge: "Help Center",
    heroTitle: "How the ∗ magic keyboard works",
    heroIntro: (
      <>
        If you’re seeing a demo link, iOS hasn’t granted <span className="font-medium">Full Access</span> yet. Here’s what <span className="font-medium">∗ magic</span> does and how to enable it.
      </>
    ),
    overview: {
      title: "Key points",
      bullets: [
        (
          <>
            <span className="font-medium">∗ magic</span> lives inside your bank’s app and creates payment links without leaving the chat.
          </>
        ),
        (
          <>
            Real links follow the same authentication steps as sending money inside your banking app.
          </>
        ),
        (
          <>
            Funds move only after the recipient claims the link.
          </>
        ),
      ],
    },
    sections: [
      {
        title: "When you send a real link",
        description: "Once Full Access is on, the flow looks like this:",
        steps: [
          {
            label: "1",
            title: "Pick the amount in ∗ magic",
            description: (
              <>
                Open the keyboard, tap <span className="font-medium">Send</span>, and choose the amount without leaving the chat.
              </>
            ),
          },
          {
            label: "2",
            title: "Share the link",
            description: (
              <>
                Your message includes a ready-to-open <span className="font-medium">payment link</span>.
              </>
            ),
          },
          {
            label: "3",
            title: "The other person claims it",
            description: (
              <>
                They enter their account info and the transfer completes instantly.
              </>
            ),
          },
        ],
      },
      {
        title: "When you see a demo link",
        items: [
          (
            <>
              iOS hasn’t allowed <span className="font-medium">Full Access</span>, so ∗ magic sends a preview instead.
            </>
          ),
          "The message shows what would happen, but it doesn’t move real money.",
          "Use it to explain the flow before you enable it.",
        ],
      },
      {
        title: "Security stays on",
        items: [
          (
            <>
              Creating a link requires the same <span className="font-medium">auth checks</span> as your banking app.
            </>
          ),
          (
            <>
              Funds remain in your account until someone claims the link.
            </>
          ),
          (
            <>
              Each link lasts <span className="font-medium">24 hours</span> and you can cancel it anytime.
            </>
          ),
          (
            <>
              Granting <span className="font-medium">Full Access</span> doesn’t let ∗ magic read what you type; it only enables link creation.
            </>
          ),
        ],
      },
    ],
    tip: {
      title: "Enable Full Access on iOS",
      description: "Do it once and you’re set.",
      steps: [
        (
          <>
            Go to <span className="font-medium">Settings → General → Keyboard → Keyboards</span>.
          </>
        ),
        (
          <>
            Tap <span className="font-medium">∗ magic</span> and toggle <span className="font-medium">Allow Full Access</span>.
          </>
        ),
        "Accept the iOS prompt. Return to the chat and send a real link.",
      ],
    },
    support: {
      title: "Need a hand?",
      description: "We can walk you through the setup live if you’d like.",
      ctaLabel: "Email support@mgic.me",
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

export default async function MagicKeyboardHelpPage({
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
              {copy.heroTitle}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">{copy.heroIntro}</p>
          </header>

          <section className="rounded-3xl border border-border bg-card/70 p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground">{copy.overview.title}</h2>
            <ul className="mt-6 space-y-3 text-base leading-7 text-foreground/80">
              {copy.overview.bullets.map((bullet, index) => (
                <li key={`overview-${index}`} className="flex gap-3">
                  <span className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          {copy.sections.map((section, sectionIndex) => (
            <section
              key={`section-${sectionIndex}`}
              className="space-y-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm"
            >
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
                {section.description ? (
                  <p className="text-base leading-7 text-foreground/80">{section.description}</p>
                ) : null}
              </div>

              {section.steps ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {section.steps.map((step, stepIndex) => (
                    <div
                      key={`section-${sectionIndex}-step-${stepIndex}`}
                      className="flex h-full flex-col rounded-2xl border border-border bg-background/60 p-6"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-sm font-semibold text-foreground">
                          {step.label}
                        </span>
                        <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-foreground/80">{step.description}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {section.items ? (
                <ul className="space-y-3 text-base leading-7 text-foreground/80">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={`section-${sectionIndex}-item-${itemIndex}`}
                      className="flex gap-3 rounded-2xl border border-border/70 bg-background/60 p-4"
                    >
                      <span className="mt-2 inline-block h-2 w-2 rounded-full bg-foreground/40" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="space-y-4 rounded-3xl border border-border bg-gradient-to-br from-emerald-500/20 via-background to-background p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">{copy.tip.title}</h2>
              <p className="text-base leading-7 text-foreground/80">{copy.tip.description}</p>
            </div>
            <ol className="space-y-3 text-sm leading-6 text-foreground/80">
              {copy.tip.steps.map((step, index) => (
                <li key={`tip-step-${index}`} className="flex gap-3">
                  <span className="font-semibold text-foreground/70">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{copy.support.title}</h2>
              <p className="text-base leading-7 text-foreground/80">{copy.support.description}</p>
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


