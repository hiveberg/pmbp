import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Code2 } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Pobierz PMBP',
  description: 'Pobierz najnowszą wersję aplikacji PMBP.',
  alternates: { canonical: '/download' },
};

export default function DownloadPage() {
  if (siteConfig.downloadUrl) redirect(siteConfig.downloadUrl);

  return (
    <main className="subpage">
      <div className="subpage-header">
        <SiteHeader downloadHref="#download-info" />
      </div>
      <div id="download-info" className="subpage-content">
        <section className="subpage-card">
          <p className="eyebrow">Pobieranie</p>
          <h1>PMBP będzie dostępny na GitHubie</h1>
          <p className="subpage-lead">
            Link do wydań zostanie aktywowany po ustawieniu adresu repozytorium
            w konfiguracji środowiska.
          </p>
          <a
            className="button button-dark-outline"
            href={siteConfig.githubHref}
          >
            <Code2 size={19} aria-hidden="true" /> Przejdź do Open Source
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
