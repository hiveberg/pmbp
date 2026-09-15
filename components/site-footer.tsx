import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-width footer-grid">
        <div>
          <Link
            href="/"
            className="brand footer-brand"
            aria-label="PMBP — strona główna"
          >
            <span className="brand-mark">
              PM<span>BP</span>
            </span>
            <span className="brand-copy">
              <strong>Polski Magazyn Broni Palnej</strong>
              <small>Ewidencja. Kontrola. Bezpieczeństwo.</small>
            </span>
          </Link>
          <p>© 2026 Integral Dot sp. z o.o.</p>
          <p>
            Projekt open source dostępny na{' '}
            <a href={siteConfig.githubHref}>GitHubie</a>.
          </p>
        </div>
        <nav aria-label="Stopka">
          <Link href="/#funkcje">Produkt</Link>
          <Link href="/demo">Demo</Link>
          <Link href="/download">Pobierz</Link>
          <Link href="/docs">Dokumentacja</Link>
          <Link href="/support">Wsparcie</Link>
          <Link href="/privacy">Polityka prywatności</Link>
        </nav>
      </div>
    </footer>
  );
}
