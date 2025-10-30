import { routing } from '@/i18n/routing';
import './globals.css';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}

export function generateMetadata() {
  return {
    title: "MagicPay",
    description: "Digital payments made simple",
  };
}
