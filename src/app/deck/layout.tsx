import type {Metadata} from 'next';
import '../globals.css';
import './deck-tokens.css';

export const metadata: Metadata = {
  title: 'Magic Pay',
  robots: {index: false, follow: false}
};

export default function DeckLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
