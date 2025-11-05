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
    title: "Demo teclado ∗ magic | magicPay",
    description:
      "Descubre cómo ∗ magic genera ligas de pago desde cualquier chat y aprende a habilitar Acceso Completo para enviar dinero real.",
    openGraph: {
      title: "Demo teclado ∗ magic",
      description:
        "Así funciona el teclado de tu banco que envía ligas de pago sin salir de WhatsApp. Activa Acceso Completo y comparte dinero en segundos.",
      images: [
        {
          url: "/placeholder-1.png",
          width: 1200,
          height: 630,
          alt: "Demo ∗ magic",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Demo teclado ∗ magic",
      description:
        "Genera ligas de pago desde cualquier chat. Ve la demo y activa Acceso Completo para enviar dinero real.",
      images: ["/placeholder-1.png"],
    },
  },
  en: {
    title: "∗ magic keyboard demo | magicPay",
    description:
      "See how the ∗ magic keyboard creates payment links from any chat and enable Full Access to send real money.",
    openGraph: {
      title: "∗ magic keyboard demo",
      description:
        "The keyboard inside your banking app that sends payment links without leaving WhatsApp. Enable Full Access and share money instantly.",
      images: [
        {
          url: "/placeholder-1.png",
          width: 1200,
          height: 630,
          alt: "∗ magic demo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "∗ magic keyboard demo",
      description:
        "Create payment links from any chat. Watch the demo and turn on Full Access to send real payments.",
      images: ["/placeholder-1.png"],
    },
  },
};

const content: Record<"en" | "es", LocaleContent> = {
  es: {
    heroBadge: "Centro de ayuda",
    heroTitle: "Teclado ∗ magic: demo rápida",
    heroIntro: (
      <>
        Si ves una liga de demostración es porque iOS todavía no dio <span className="font-medium">Acceso Completo</span>. Aquí ves cómo funciona <span className="font-medium">∗ magic</span> y por qué activarlo.
      </>
    ),
    overview: {
      title: "Lo esencial",
      bullets: [
        (
          <>
            <span className="font-medium">∗ magic</span> vive dentro de tu app bancaria y crea ligas de pago sin salir del chat.
          </>
        ),
        (
          <>
            Las ligas reales se autentican igual que una transferencia normal y el dinero se mueve cuando la persona la cobra.
          </>
        ),
        (
          <>
            Cada liga dura <span className="font-medium">24 horas</span>, puedes cancelarla cuando quieras y solo quien la tiene puede cobrarla.
          </>
        ),
      ],
    },
    sections: [
      {
        title: "Así se ve una liga real",
        description: "En tres pasos, sin salir de WhatsApp:",
        steps: [
          {
            label: "1",
            title: "Elige el monto en ∗ magic",
            description: (
              <>
                Abre el teclado, toca <span className="font-medium">Enviar</span> y define el monto desde la conversación.
              </>
            ),
          },
          {
            label: "2",
            title: "Comparte la liga",
            description: (
              <>
                El chat recibe una <span className="font-medium">liga de pago</span> segura lista para abrirse.
              </>
            ),
          },
          {
            label: "3",
            title: "La otra persona cobra",
            description: (
              <>
                Introduce su cuenta y la transferencia se ejecuta al instante con las validaciones de tu banco.
              </>
            ),
          },
        ],
      },
      {
        title: "¿Por qué ves una demo?",
        items: [
          (
            <>
              Sin <span className="font-medium">Acceso Completo</span>, ∗ magic solo muestra un ejemplo para que conozcas el flujo.
            </>
          ),
          "Puedes simular montos, pero no sale dinero real.",
          "Activa Acceso Completo una vez y las ligas volverán a ser reales.",
        ],
      },
      {
        title: "Seguridad garantizada",
        items: [
          (
            <>
              La liga requiere las mismas <span className="font-medium">autenticaciones</span> que en tu banca móvil.
            </>
          ),
          "El dinero permanece en tu cuenta hasta que alguien cobra la liga.",
          (
            <>
              Dar <span className="font-medium">Acceso Completo</span> no permite que ∗ magic lea tus conversaciones; solo habilita crear ligas.
            </>
          ),
        ],
      },
    ],
    tip: {
      title: "Activa Acceso Completo",
      description: "Solo toma unos segundos:",
      steps: [
        (
          <>
            Abre <span className="font-medium">Ajustes → General → Teclado → Teclados</span>.
          </>
        ),
        (
          <>
            Toca <span className="font-medium">∗ magic</span> y habilita <span className="font-medium">Permitir acceso completo</span>.
          </>
        ),
        "Acepta el aviso de iOS y vuelve al chat para enviar una liga real.",
      ],
    },
    support: {
      title: "¿Necesitas ayuda?",
      description: "Nuestro equipo puede guiarte en vivo para activarlo.",
      ctaLabel: "Escríbenos a soporte@mgic.me",
      ctaHref: "mailto:soporte@mgic.me",
    },
  },
  en: {
    heroBadge: "Help Center",
    heroTitle: "∗ magic keyboard demo",
    heroIntro: (
      <>
        Seeing a demo link means iOS hasn’t granted <span className="font-medium">Full Access</span> yet. Check how <span className="font-medium">∗ magic</span> works and why it’s worth enabling.
      </>
    ),
    overview: {
      title: "What to know",
      bullets: [
        (
          <>
            <span className="font-medium">∗ magic</span> lives inside your bank’s app and builds payment links without leaving the chat.
          </>
        ),
        (
          <>
            Real links go through the same security and the money moves once the recipient claims it.
          </>
        ),
        (
          <>
            Each link lasts <span className="font-medium">24 hours</span>, you can cancel anytime, and whoever has it can cash it.
          </>
        ),
      ],
    },
    sections: [
      {
        title: "What a real link looks like",
        description: "Three steps, all inside WhatsApp:",
        steps: [
          {
            label: "1",
            title: "Pick the amount in ∗ magic",
            description: (
              <>
                Open the keyboard, tap <span className="font-medium">Send</span>, and choose the amount right in the chat.
              </>
            ),
          },
          {
            label: "2",
            title: "Share the link",
            description: (
              <>
                Your message delivers a secure <span className="font-medium">payment link</span> people can open instantly.
              </>
            ),
          },
          {
            label: "3",
            title: "They cash it",
            description: (
              <>
                They enter their account info and the transfer runs with your bank’s security checks.
              </>
            ),
          },
        ],
      },
      {
        title: "Why you’re seeing a demo",
        items: [
          (
            <>
              Without <span className="font-medium">Full Access</span>, ∗ magic shows a preview so you know how it works.
            </>
          ),
          "You can play with amounts, but no real money moves.",
          "Enable Full Access once and real links are back.",
        ],
      },
      {
        title: "Security stays on",
        items: [
          (
            <>
              Links require the same <span className="font-medium">auth checks</span> as your mobile banking app.
            </>
          ),
          "Funds stay in your account until someone claims the link.",
          (
            <>
              Granting <span className="font-medium">Full Access</span> never lets ∗ magic read your messages; it only enables link creation.
            </>
          ),
        ],
      },
    ],
    tip: {
      title: "Turn on Full Access",
      description: "Just a quick toggle:",
      steps: [
        (
          <>
            Go to <span className="font-medium">Settings → General → Keyboard → Keyboards</span>.
          </>
        ),
        (
          <>
            Tap <span className="font-medium">∗ magic</span> and switch on <span className="font-medium">Allow Full Access</span>.
          </>
        ),
        "Accept the iOS prompt and head back to the chat to send a real link.",
      ],
    },
    support: {
      title: "Need support?",
      description: "We can walk you through the setup live.",
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

export default async function DemoKeyboardPage({
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


