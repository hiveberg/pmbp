import type { Metadata } from 'next';
import { Phone } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Wsparcie techniczne | PMBP',
  description: 'Pomoc przy instalacji, konfiguracji i aktualizacji PMBP.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  return (
    <main className="subpage">
      <div className="subpage-header">
        <SiteHeader downloadHref={siteConfig.downloadHref} />
      </div>
      <div className="subpage-content">
        <section className="subpage-card">
          <p className="eyebrow">Integral Dot sp. z o.o.</p>
          <h1>Wsparcie techniczne i serwis</h1>
          <p className="subpage-lead">
            Oferujemy profesjonalne wsparcie przy instalacji, konfiguracji,
            aktualizacji oraz rozwiązywaniu problemów technicznych.
          </p>
          <a className="button button-red" href={siteConfig.supportPhoneHref}>
            <Phone size={19} aria-hidden="true" /> Zadzwoń:{' '}
            {siteConfig.supportPhoneDisplay}
          </a>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
