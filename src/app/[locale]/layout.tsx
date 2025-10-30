import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { DotPattern } from "@/components/ui/dot-pattern";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: "/icon.svg",
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: "/placeholder-1.png",
          width: 1200,
          height: 630,
          alt: `${t('title')} preview`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/placeholder-1.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.some((supportedLocale) => supportedLocale === locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/apercu-pro/apercu_regular_pro.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/apercu-pro/apercu_medium_pro.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
      </head>
      <body className="antialiased font-sans">
        <div className="relative min-h-screen">
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className="absolute inset-0 -z-50 opacity-30"
          />
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}

