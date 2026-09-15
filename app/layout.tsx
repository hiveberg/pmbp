import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { WebMcpDemoTool } from '@/components/webmcp-demo-tool';
import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin', 'latin-ext'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pmbp.pl';
const description =
  'Bezpłatna aplikacja open source do elektronicznej ewidencji broni i amunicji. Działa lokalnie, bez abonamentu i obowiązkowej chmury.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PMBP — Polski Magazyn Broni Palnej',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: '/',
    title: 'PMBP — Polski Magazyn Broni Palnej',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'PMBP — Polski Magazyn Broni Palnej',
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${geist.variable} antialiased`}>
        {children}
        <WebMcpDemoTool />
      </body>
    </html>
  );
}
