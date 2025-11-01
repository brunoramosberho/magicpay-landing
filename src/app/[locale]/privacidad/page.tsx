import { HeroHeader } from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from "next";

type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string;
  linkText?: string;
  linkHref?: string;
};

type LocaleContent = {
  pageTitle: string;
  intro: string;
  sections: Section[];
};

const metadataByLocale: Record<string, Metadata> = {
  es: {
    title: "Aviso de privacidad | magicPay",
    description:
      "Conoce cómo magicPay trata y protege tus datos personales, así como los medios para ejercer tus derechos ARCO.",
  },
  en: {
    title: "Privacy Notice | magicPay",
    description:
      "Learn how magicPay handles and protects your personal data and how to exercise your privacy rights.",
  },
};

const content: Record<"en" | "es", LocaleContent> = {
  es: {
    pageTitle: "Aviso de privacidad",
    intro:
      "MAGIC PAYMENTS, S.A. DE C.V. (“magic”), con domicilio en Calle Tlaloc 9, Colonia El Contadero, Cuajimalpa de Morelos, Ciudad de México, México, C.P. 05500, es responsable del tratamiento de los datos personales que usted proporcione.",
    sections: [
      {
        title: "Datos que recabamos",
        items: [
          "Nombre completo",
          "Cuenta CLABE o número de cuenta bancaria",
          "Número de teléfono (solo en caso de transferencias mediante DIMO)",
        ],
      },
      {
        title: "Finalidad del tratamiento",
        paragraphs: [
          "Los datos se utilizan para procesar la transferencia bancaria y depositar el dinero en la cuenta indicada.",
          "En transferencias SPEI, la información se comparte únicamente con la institución bancaria encargada de ejecutar la transferencia.",
          "En transferencias DIMO, el número telefónico se usa únicamente para identificar la cuenta bancaria y no se comparte con terceros.",
        ],
      },
      {
        title: "Almacenamiento local en su dispositivo",
        paragraphs: [
          "Para agilizar futuras operaciones, la última cuenta o número utilizado puede guardarse automáticamente en el almacenamiento local de su navegador. Esta información:",
        ],
        items: [
          "Permanece únicamente en su dispositivo",
          "No se envía a nuestros servidores",
          "No se comparte con terceros",
        ],
        closing:
          "Usted puede eliminarla en cualquier momento borrando los datos de su navegador.",
      },
      {
        title: "Medidas de seguridad",
        paragraphs: [
          "La información almacenada en nuestros sistemas se cifra y se protege mediante controles administrativos y técnicos para evitar el acceso, uso o divulgación no autorizada.",
        ],
      },
      {
        title: "Derechos ARCO y revocación",
        paragraphs: [
          "Usted puede acceder, corregir, cancelar u oponerse al uso de sus datos, así como revocar su consentimiento, enviando una solicitud a:",
        ],
        linkText: "privacidad@mgic.me",
        linkHref: "mailto:privacidad@mgic.me",
        closing:
          "Incluya su nombre completo y la descripción del derecho que desea ejercer.",
      },
      {
        title: "Modificaciones al Aviso",
        paragraphs: [
          "Cualquier actualización será publicada en:",
        ],
        linkText: "https://mgic.me/privacidad",
        linkHref: "https://mgic.me/privacidad",
      },
    ],
  },
  en: {
    pageTitle: "Privacy Notice",
    intro:
      "MAGIC PAYMENTS, S.A. DE C.V. (“magic”), located at Calle Tlaloc 9, Colonia El Contadero, Cuajimalpa de Morelos, Mexico City, Mexico, ZIP 05500, is responsible for processing the personal data you provide.",
    sections: [
      {
        title: "Data We Collect",
        items: [
          "Full name",
          "CLABE account number or bank account number",
          "Phone number (only for transfers made through DIMO)",
        ],
      },
      {
        title: "Purpose of Processing",
        paragraphs: [
          "We use your data to process bank transfers and deposit funds into the designated account.",
          "For SPEI transfers, information is shared only with the financial institution responsible for executing the transfer.",
          "For DIMO transfers, the phone number is used exclusively to identify the bank account and is not shared with third parties.",
        ],
      },
      {
        title: "Local Storage on Your Device",
        paragraphs: [
          "To streamline future transactions, the last account or number used may be stored automatically in your browser’s local storage. This information:",
        ],
        items: [
          "Stays only on your device",
          "Is not sent to our servers",
          "Is not shared with third parties",
        ],
        closing:
          "You can delete it at any time by clearing your browser data.",
      },
      {
        title: "Security Measures",
        paragraphs: [
          "Information stored in our systems is encrypted and protected with administrative and technical controls to prevent unauthorized access, use, or disclosure.",
        ],
      },
      {
        title: "ARCO Rights and Consent Withdrawal",
        paragraphs: [
          "You may access, correct, cancel, or oppose the use of your data, as well as withdraw your consent, by sending a request to:",
        ],
        linkText: "privacidad@mgic.me",
        linkHref: "mailto:privacidad@mgic.me",
        closing:
          "Please include your full name and a description of the right you wish to exercise.",
      },
      {
        title: "Notice Updates",
        paragraphs: [
          "Any updates will be published at:",
        ],
        linkText: "https://mgic.me/privacidad",
        linkHref: "https://mgic.me/privacidad",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataByLocale[locale] ?? metadataByLocale.en;
}

export default async function PrivacyNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = (locale in content ? locale : "en") as keyof typeof content;
  const copy = content[normalizedLocale];

  return (
    <>
      <HeroHeader />
      <main className="px-6 pt-32 pb-24 lg:pb-32">
        <article className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center sm:text-left">
            <span className="inline-flex items-center justify-center rounded-full border border-border px-4 py-1 text-xs font-medium uppercase tracking-wide text-foreground/70">
              magicPay
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {copy.pageTitle}
            </h1>
            <p className="text-lg leading-relaxed text-foreground/80">
              {copy.intro}
            </p>
          </div>

          <section className="space-y-10 rounded-3xl border border-border bg-card/70 p-6 shadow-sm sm:p-10">
            {copy.sections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p
                    key={`${section.title}-paragraph-${index}`}
                    className="text-base leading-7 text-foreground/80"
                  >
                    {paragraph}
                    {section.linkText && section.linkHref &&
                      index === section.paragraphs.length - 1 && (
                        <>
                          {" "}
                          <a
                            className="font-medium text-foreground underline decoration-foreground/40 underline-offset-2 hover:text-foreground/90"
                            href={section.linkHref}
                          >
                            {section.linkText}
                          </a>
                        </>
                      )}
                  </p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-5 text-base leading-7 text-foreground/80">
                    {section.items.map((item, index) => (
                      <li key={`${section.title}-item-${index}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.linkText && section.linkHref && !section.paragraphs?.length ? (
                  <a
                    className="inline-flex items-center text-base font-medium text-foreground underline decoration-foreground/40 underline-offset-2 hover:text-foreground/90"
                    href={section.linkHref}
                  >
                    {section.linkText}
                  </a>
                ) : null}
                {section.closing ? (
                  <p className="text-base leading-7 text-foreground/80">
                    {section.closing}
                  </p>
                ) : null}
              </div>
            ))}
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}


