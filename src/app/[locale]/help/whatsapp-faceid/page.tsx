import {HeroHeader} from "@/components/header";
import Footer from "@/components/footer";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import type {Metadata} from "next";

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

const copy = {
  es: {
    badge: "Centro de ayuda",
    title: "WhatsApp cierra el teclado al pedir Face ID",
    subtitle: "Desactiva Face ID dentro de WhatsApp y actívalo desde iOS. Toma menos de un minuto.",
    why: "¿Por qué pasa?",
    whyText: "WhatsApp tiene un ajuste llamado Requerir Face ID que bloquea la app y cierra teclados de terceros como magic. Al apagarlo, magic se mantiene abierto.",
    noWorries: "No pierdes seguridad",
    noWorriesText: "iOS puede pedir Face ID al abrir WhatsApp desde el home. Misma protección, sin cerrar el teclado.",
    checklist: ["iPhone con Face ID", "WhatsApp actualizado", "Código de desbloqueo"],
    paso1Badge: "Paso 1",
    paso1Title: "Apaga Face ID dentro de WhatsApp",
    paso1Subtitle: "3 toques y listo",
    step1_1Label: "Abre Ajustes",
    step1_1Desc: "Toca la pestaña Tú en WhatsApp.",
    step1_2Label: "Ve a Privacidad",
    step1_2Desc: "Toca Bloqueo de aplicación.",
    step1_3Label: "Apaga el switch",
    step1_3Desc: "Deja Requerir Face ID en off.",
    beforeLabel: "Antes",
    afterLabel: "Después",
    paso1Done: "El teclado magic ya no se cierra al avanzar.",
    paso2Badge: "Paso 2",
    paso2Title: "Activa Face ID desde iOS",
    paso2Subtitle: "Seguridad sin interrupciones",
    step2_1Label: "Mantén presionado",
    step2_1Desc: "Desde el home, haz long press en WhatsApp.",
    step2_2Label: "Toca Solicitar Face ID",
    step2_2Desc: "Ahora iOS pide Face ID al abrir la app.",
    paso2Note: 'Para quitarlo, repite el gesto y elige "Dejar de solicitar Face ID".',
    doneTitle: "¡Listo!",
    doneText: "Abre un chat, lanza el teclado magic y verifica que permanezca visible. Si funcionó, comparte esta guía.",
    supportTitle: "¿Necesitas ayuda?",
    supportText: "Escríbenos y te ayudamos al momento.",
    supportCta: "Escríbenos a soporte@mgic.me",
    tip: "Tip: Marca este tutorial como favorito para compartirlo cuando lo necesites.",
  },
  en: {
    badge: "Help Center",
    title: "WhatsApp closes the keyboard when Face ID appears",
    subtitle: "Turn off Face ID inside WhatsApp and enable it from iOS. Takes less than a minute.",
    why: "Why does this happen?",
    whyText: "WhatsApp has a setting called Require Face ID that locks the app and closes third-party keyboards like magic. Turning it off keeps magic open.",
    noWorries: "You won't lose security",
    noWorriesText: "iOS can still require Face ID when opening WhatsApp from the home screen. Same protection, no keyboard interruption.",
    checklist: ["iPhone with Face ID", "Latest WhatsApp", "Device passcode"],
    paso1Badge: "Step 1",
    paso1Title: "Turn off Face ID inside WhatsApp",
    paso1Subtitle: "3 taps and done",
    step1_1Label: "Open Settings",
    step1_1Desc: "Tap the You tab in WhatsApp.",
    step1_2Label: "Go to Privacy",
    step1_2Desc: "Tap App Lock.",
    step1_3Label: "Switch it off",
    step1_3Desc: "Leave Require Face ID off.",
    beforeLabel: "Before",
    afterLabel: "After",
    paso1Done: "The magic keyboard no longer closes when you move forward.",
    paso2Badge: "Step 2",
    paso2Title: "Enable Face ID from iOS",
    paso2Subtitle: "Security without interruptions",
    step2_1Label: "Long-press",
    step2_1Desc: "From the home screen, long-press WhatsApp.",
    step2_2Label: "Tap Require Face ID",
    step2_2Desc: "Now iOS asks for Face ID when opening the app.",
    paso2Note: 'To undo, repeat the gesture and choose "Don\'t Require Face ID".',
    doneTitle: "All done!",
    doneText: "Open a chat, launch the magic keyboard and verify it stays visible. If it worked, share this guide.",
    supportTitle: "Need help?",
    supportText: "Drop us a line and we'll jump right in.",
    supportCta: "Email us at support@mgic.me",
    tip: "Tip: Bookmark this tutorial so you can share it quickly when needed.",
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
  const t = locale in copy ? copy[locale as keyof typeof copy] : copy.en;

  return (
    <>
      <HeroHeader />
      <main className="px-4 pt-28 pb-20 sm:px-6 lg:pb-28">
        <article className="mx-auto max-w-5xl">

          {/* ── Hero ── */}
          <header className="text-center space-y-5 mb-16">
            <span className="inline-flex items-center rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60">
              {t.badge}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl leading-tight">
              {t.title}
            </h1>
            <p className="mx-auto max-w-xl text-lg text-foreground/70">
              {t.subtitle}
            </p>
          </header>

          {/* ── Why + Checklist ── */}
          <section className="mb-20 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t.why}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{t.whyText}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t.noWorries}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{t.noWorriesText}</p>
            </div>
          </section>

          {/* ── PASO 1 ── */}
          <section className="mb-20">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                {t.paso1Badge}
              </span>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{t.paso1Title}</h2>
              <p className="text-foreground/60">{t.paso1Subtitle}</p>
            </div>

            {/* Navigation path: Settings → Privacy → App Lock */}
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-8 mb-12">
              {[
                { label: t.step1_1Label, desc: t.step1_1Desc, num: "1", img: "/help/help-wa-settings.png" },
                { label: t.step1_2Label, desc: t.step1_2Desc, num: "2", img: "/help/help-wa-privacy.png" },
                { label: t.step1_3Label, desc: t.step1_3Desc, num: "3", img: null },
              ].map((step) => (
                <div key={step.num} className="group text-center space-y-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                      {step.num}
                    </span>
                    <span className="text-base font-semibold text-foreground">{step.label}</span>
                  </div>
                  {step.img && (
                    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 shadow-lg transition-transform group-hover:scale-[1.02]">
                      <Image
                        src={step.img}
                        alt={step.label}
                        width={768}
                        height={548}
                        className="w-full h-auto"
                        quality={95}
                      />
                    </div>
                  )}
                  <p className="text-sm text-foreground/60">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Before / After comparison */}
            <div className="rounded-3xl border border-border bg-gradient-to-b from-card/80 to-background p-5 sm:p-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-4 text-center">
                  <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-600">
                    {t.beforeLabel}
                  </span>
                  <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-red-200 shadow-lg">
                    <Image
                      src="/help/help-wa-faceid-on.png"
                      alt="Face ID ON"
                      width={768}
                      height={548}
                      className="w-full h-auto"
                      quality={95}
                    />
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                    {t.afterLabel}
                  </span>
                  <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border-2 border-emerald-200 shadow-lg">
                    <Image
                      src="/help/help-wa-faceid-off.png"
                      alt="Face ID OFF"
                      width={768}
                      height={548}
                      className="w-full h-auto"
                      quality={95}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                <p className="text-sm font-medium text-emerald-800">{t.paso1Done}</p>
              </div>
            </div>
          </section>

          {/* ── PASO 2 ── */}
          <section className="mb-20">
            <div className="text-center mb-10 space-y-3">
              <span className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
                {t.paso2Badge}
              </span>
              <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{t.paso2Title}</h2>
              <p className="text-foreground/60">{t.paso2Subtitle}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] items-center">
              <div className="space-y-6">
                {[
                  { num: "1", label: t.step2_1Label, desc: t.step2_1Desc },
                  { num: "2", label: t.step2_2Label, desc: t.step2_2Desc },
                ].map((step) => (
                  <div key={step.num} className="flex gap-4 items-start">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{step.label}</h3>
                      <p className="text-sm text-foreground/60 mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}

                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  {t.paso2Note}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border/60 shadow-xl">
                <Image
                  src="/help/help-ios-longpress.png"
                  alt="iOS long press menu"
                  width={768}
                  height={548}
                  className="w-full h-auto"
                  quality={95}
                />
              </div>
            </div>
          </section>

          {/* ── Done + CTA ── */}
          <section className="mb-12 text-center rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-background to-background p-8 sm:p-12 space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{t.doneTitle}</h2>
            <p className="mx-auto max-w-md text-foreground/70">{t.doneText}</p>
            <p className="text-xs text-foreground/50">{t.tip}</p>
          </section>

          {/* ── Support ── */}
          <section className="flex flex-col gap-6 rounded-2xl border border-border bg-card/60 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">{t.supportTitle}</h2>
              <p className="text-sm text-foreground/70">{t.supportText}</p>
            </div>
            <Button asChild size="lg" className="self-start whitespace-nowrap">
              <a href="mailto:soporte@mgic.me">{t.supportCta}</a>
            </Button>
          </section>

        </article>
      </main>
      <Footer />
    </>
  );
}
