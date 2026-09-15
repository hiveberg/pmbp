import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Polityka prywatności | PMBP',
  description: 'Informacje o przetwarzaniu danych w formularzu demo PMBP.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <main className="subpage">
      <div className="subpage-header">
        <SiteHeader downloadHref={siteConfig.downloadHref} />
      </div>
      <div className="subpage-content">
        <article className="subpage-card privacy-copy">
          <p className="eyebrow">Prywatność</p>
          <h1>Polityka prywatności</h1>
          <p className="subpage-lead">
            Poniżej wyjaśniamy, jakie dane przekazujesz w formularzu demo i w
            jakim celu je wykorzystujemy.
          </p>

          <h2>Administrator danych</h2>
          <p>
            Administratorem danych jest Integral Dot sp. z o.o. Pełne dane
            rejestrowe i adres do korespondencji zostaną uzupełnione przed
            uruchomieniem formularza w środowisku produkcyjnym.
          </p>
          <p className="privacy-notice">
            <strong>Do uzupełnienia przed publikacją:</strong> adres siedziby,
            adres e-mail do spraw prywatności oraz pełne dane rejestrowe
            administratora.
          </p>

          <h2>Zakres i cel przetwarzania</h2>
          <p>
            Przetwarzamy imię i nazwisko, adres e-mail oraz numer telefonu
            wyłącznie po to, aby obsłużyć prośbę o dostęp do wersji
            demonstracyjnej PMBP i skontaktować się w tej sprawie.
          </p>

          <h2>Podstawa prawna</h2>
          <p>
            Dane są przetwarzane na podstawie zgody udzielonej podczas wysyłania
            formularza. Zgodę można wycofać w dowolnym momencie, bez wpływu na
            zgodność wcześniejszego przetwarzania z prawem.
          </p>

          <h2>Okres przechowywania</h2>
          <p>
            Dane przechowujemy przez czas potrzebny do obsługi zgłoszenia, a
            następnie przez okres niezbędny do zabezpieczenia ewentualnych
            roszczeń lub do czasu wycofania zgody, jeśli nie zachodzi inna
            podstawa prawna.
          </p>

          <h2>Odbiorcy i prawa</h2>
          <p>
            Dane mogą być powierzane dostawcom infrastruktury i poczty
            elektronicznej wyłącznie w zakresie potrzebnym do obsługi
            zgłoszenia. Masz prawo żądać dostępu do danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania i przeniesienia, a także
            wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.
          </p>

          <h2>Dane techniczne</h2>
          <p>
            Dla podstawowej ochrony przed nadużyciami możemy zapisać skrót
            adresu IP i informacje o przeglądarce. Surowy adres IP nie jest
            zapisywany w rekordzie zgłoszenia.
          </p>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
