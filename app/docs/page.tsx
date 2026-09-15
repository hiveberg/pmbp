import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Dokumentacja | PMBP',
  description: 'Dokumentacja instalacji i użytkowania PMBP.',
  alternates: { canonical: '/docs' },
};

export default function DocsPage() {
  if (siteConfig.githubUrl) {
    redirect(`${siteConfig.githubUrl.replace(/\/$/, '')}/tree/main/docs`);
  }

  return (
    <main className="subpage">
      <div className="subpage-header">
        <SiteHeader downloadHref={siteConfig.downloadHref} />
      </div>
      <div className="subpage-content">
        <section className="subpage-card">
          <p className="eyebrow">Dokumentacja</p>
          <h1>Dokumentacja PMBP</h1>
          <p className="subpage-lead">
            Dokumentacja będzie dostępna razem z kodem źródłowym po ustawieniu
            adresu repozytorium GitHub.
          </p>
          <a className="button button-primary" href={siteConfig.githubHref}>
            <BookOpen size={19} aria-hidden="true" /> Open Source
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
