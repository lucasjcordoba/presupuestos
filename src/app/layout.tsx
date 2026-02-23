import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '300', '400'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'Gasto Semanal',
  description: 'Aplicación para gestionar tu presupuesto semanal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={raleway.variable}>
      <body
        className="min-h-screen font-[family-name:var(--font-raleway)]"
        style={{ background: 'linear-gradient(to right, #004e92, #000428)' }}
      >
        {children}
      </body>
    </html>
  );
}
