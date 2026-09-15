import type { Metadata } from 'next';
import { DemoRequestForm } from '@/components/demo-request-form';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Wypróbuj demo | PMBP',
  description: 'Poproś o dostęp do wersji demonstracyjnej aplikacji PMBP.',
  alternates: { canonical: '/demo' },
};

export default function DemoPage() {
  return (
    <main className="subpage">
      <div className="subpage-header">
        <SiteHeader downloadHref={siteConfig.downloadHref} />
      </div>
      <div className="subpage-content">
        <section className="subpage-card">
          <p className="eyebrow">Wersja demonstracyjna</p>
          <h1>Zobacz PMBP w działaniu</h1>
          <p className="subpage-lead">
            Zostaw dane kontaktowe. Zweryfikujemy zgłoszenie i prześlemy link do
            wersji demonstracyjnej.
          </p>
          <DemoRequestForm />
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
