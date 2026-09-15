'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Menu, X } from 'lucide-react';
import { DemoRequestDialog } from './demo-request-dialog';

type SiteHeaderProps = { downloadHref: string };

export function SiteHeader({ downloadHref }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header page-width">
      <Link href="/" className="brand" aria-label="PMBP — strona główna">
        <span className="brand-mark">
          PM<span>BP</span>
        </span>
        <span className="brand-copy">
          <strong>Polski Magazyn Broni Palnej</strong>
          <small>Ewidencja. Kontrola. Bezpieczeństwo.</small>
        </span>
      </Link>

      <nav aria-label="Główna nawigacja" className="desktop-nav">
        <Link href="/#funkcje">Funkcje</Link>
        <Link href="/#jak-to-dziala">Jak to działa</Link>
        <Link href="/#open-source">Open Source</Link>
        <Link href="/#wsparcie">Wsparcie</Link>
        <Link href="/docs">Dokumentacja</Link>
      </nav>

      <div className="header-actions">
        <DemoRequestDialog className="button button-outline button-small header-demo">
          Wypróbuj demo
        </DemoRequestDialog>
        <a className="button button-red button-small" href={downloadHref}>
          Pobierz <Download size={15} aria-hidden="true" />
        </a>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {menuOpen && (
        <nav aria-label="Menu mobilne" className="mobile-nav">
          {[
            ['Funkcje', '/#funkcje'],
            ['Jak to działa', '/#jak-to-dziala'],
            ['Open Source', '/#open-source'],
            ['Wsparcie', '/#wsparcie'],
            ['Dokumentacja', '/docs'],
          ].map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
