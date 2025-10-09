import type { Metadata } from "next";
import "./globals.css";
import { DotPattern } from "@/components/ui/dot-pattern";

export const metadata: Metadata = {
  title: "MagicPay",
  description: "Digital payments made simple",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "MagicPay",
    description: "Digital payments made simple",
    images: [
      {
        url: "/placeholder-1.png", // 1200x630 recommended; replace this file to change preview
        width: 1200,
        height: 630,
        alt: "MagicPay preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MagicPay",
    description: "Digital payments made simple",
    images: ["/placeholder-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          {children}
        </div>
      </body>
    </html>
  );
}
