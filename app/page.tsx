import Image from 'next/image';
import {
  Archive,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  CloudOff,
  Code2,
  Database,
  Download,
  FileClock,
  FileText,
  Fingerprint,
  HardDriveDownload,
  History,
  KeyRound,
  Laptop,
  PackageCheck,
  Phone,
  PiggyBank,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { DemoRequestDialog } from '@/components/demo-request-dialog';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

const advantages = [
  {
    icon: PiggyBank,
    title: '100% bezpłatna',
    description: 'Korzystaj z aplikacji bez opłat i abonamentu.',
  },
  {
    icon: Code2,
    title: 'Open Source',
    description: 'Kod źródłowy projektu jest publicznie dostępny.',
  },
  {
    icon: Laptop,
    title: 'Działa lokalnie',
    description: 'Dane mogą pozostać wyłącznie na komputerze użytkownika.',
  },
  {
    icon: CloudOff,
    title: 'Bez chmury',
    description: 'Nie wymaga zewnętrznego serwera ani konta online.',
  },
];

const productFeatures = [
  {
    icon: BookOpen,
    title: 'Ewidencja broni',
    description:
      'Elektroniczne księgi broni, karty egzemplarzy i pełna historia wpisów.',
  },
  {
    icon: PackageCheck,
    title: 'Ewidencja amunicji',
    description:
      'Przychody, rozchody i aktualne stany amunicji według kalibru i książki.',
  },
  {
    icon: RefreshCw,
    title: 'Wydawanie i przyjmowanie',
    description:
      'Rejestrowanie wydań i zwrotów broni oraz amunicji wraz z osobami.',
  },
  {
    icon: FileText,
    title: 'Dokumenty',
    description:
      'Dokumenty zakupu, przyjęcia i przekazania powiązane z właściwymi wpisami.',
  },
];

const securityFeatures = [
  {
    icon: FileClock,
    title: 'Audit log',
    description: 'Historia wszystkich istotnych operacji.',
  },
  {
    icon: History,
    title: 'Historia zmian',
    description: 'Korekty nie niszczą poprzednich wpisów.',
  },
  {
    icon: KeyRound,
    title: 'Potwierdzenie PIN-em',
    description: 'Indywidualny PIN użytkownika do zatwierdzania operacji.',
  },
  {
    icon: Fingerprint,
    title: 'Kontrola integralności',
    description: 'Wykrywanie ewentualnych ingerencji w historię audytu.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <SiteHeader downloadHref={siteConfig.downloadHref} />
        <div className="hero page-width">
          <div className="hero-copy">
            <h1>Polski Magazyn Broni Palnej</h1>
            <p className="hero-subtitle">
              Elektroniczna ewidencja
              <br /> broni i amunicji.
            </p>
            <p className="hero-lead">
              Bezpłatna aplikacja open source do prowadzenia magazynu broni.
              Uruchamiasz ją na własnym komputerze i zachowujesz pełną kontrolę
              nad swoimi danymi.
            </p>
            <div className="hero-actions">
              <DemoRequestDialog className="button button-red">
                Wypróbuj demo <ArrowRight size={18} aria-hidden="true" />
              </DemoRequestDialog>
              <a
                className="button button-outline"
                href={siteConfig.downloadHref}
              >
                <Download size={18} aria-hidden="true" /> Pobierz bezpłatnie
              </a>
            </div>
            <ul className="hero-proof" aria-label="Najważniejsze zalety">
              {[
                'Bez abonamentu.',
                'Bez obowiązkowej chmury.',
                'Open source.',
              ].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-visual">
            <span className="visual-glow" aria-hidden="true" />
            <Image
              src="/images/pmbp-dashboard.png"
              alt="Panel aplikacji PMBP z podsumowaniem stanu magazynu broni"
              width={490}
              height={365}
              priority
            />
          </div>
        </div>
      </section>

      <section className="advantages" aria-label="Najważniejsze cechy PMBP">
        <div className="page-width advantage-grid">
          {advantages.map(({ icon: Icon, title, description }) => (
            <article key={title} className="advantage-card">
              <Icon aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="funkcje" className="section">
        <div className="page-width">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Funkcje</p>
              <h2>Wszystko, czego potrzebuje magazyn broni</h2>
              <p>
                Cztery obszary, które zapewniają kontrolę nad bronią, amunicją i
                dokumentacją organizacji.
              </p>
            </div>
            <a href="#jak-to-dziala" className="text-link">
              Zobacz jak to działa <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="feature-grid">
            {productFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title} className="feature-card">
                <span className="feature-icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="jak-to-dziala" className="section registry-section">
        <div className="page-width registry-grid">
          <div className="section-heading">
            <p className="eyebrow">Ewidencja</p>
            <h2>
              Cyfrowa ewidencja,
              <br /> która nadal wygląda znajomo
            </h2>
            <p>
              Interfejs rejestrów powstał na wzór tradycyjnych ksiąg magazynu
              broni i amunicji. Te same kolumny i układ — teraz z wyszukiwaniem,
              dodatkowymi funkcjami oraz wydrukami.
            </p>
            <a className="button button-primary" href="#codzienna-praca">
              Zobacz jak to działa <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <figure className="product-shot registry-shot">
            <div className="shot-label">
              <Search size={15} aria-hidden="true" /> Ewidencja posiadanej broni
            </div>
            <Image
              src="/images/pmbp-register.png"
              alt="Ewidencja posiadanej broni — Księga A w aplikacji PMBP"
              width={490}
              height={230}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section id="codzienna-praca" className="section workflow-section">
        <div className="page-width">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Codzienna praca</p>
              <h2>Szybko, wygodnie, bez pomyłek</h2>
              <p>PMBP prowadzi użytkownika przez najważniejsze operacje.</p>
            </div>
          </div>
          <figure className="product-shot workflow-shot">
            <Image
              src="/images/pmbp-workflow.png"
              alt="Ekrany wydawania broni, zwrotu broni i obsługi amunicji w PMBP"
              width={865}
              height={230}
              loading="lazy"
            />
          </figure>
          <div className="workflow-grid">
            <article>
              <h3>Wydaj broń</h3>
              <p>
                Szybko znajdź egzemplarz, wybierz osobę i zarejestruj wydanie.
              </p>
            </article>
            <article>
              <h3>Zwróć broń</h3>
              <p>
                System pokazuje aktualnie wydane egzemplarze i prowadzi przez
                proces zwrotu.
              </p>
            </article>
            <article>
              <h3>Obsługuj amunicję</h3>
              <p>
                Wydawaj, zwracaj i rozliczaj amunicję razem z bronią lub
                niezależnie.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section security-section">
        <div className="page-width">
          <div className="section-heading section-heading-light">
            <p className="eyebrow eyebrow-light">Bezpieczeństwo</p>
            <h2>Każda operacja pozostawia ślad</h2>
            <p>
              System przechowuje historię operacji i pozwala sprawdzić, kto,
              kiedy i czego dokonał.
            </p>
          </div>
          <div className="security-grid">
            {securityFeatures.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <span className="security-icon">
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section backup-section">
        <div className="page-width backup-card">
          <div className="backup-intro">
            <span className="large-icon">
              <Database aria-hidden="true" />
            </span>
            <p className="eyebrow">Kopie bezpieczeństwa</p>
            <h2>Twoje dane pozostają Twoje</h2>
            <p>
              Pełna kopia najważniejszych danych aplikacji, wtedy gdy jej
              potrzebujesz.
            </p>
          </div>
          <div className="backup-items">
            <article>
              <HardDriveDownload aria-hidden="true" />
              <div>
                <h3>Automatyczny backup</h3>
                <p>Raz dziennie, o wybranej przez Ciebie godzinie.</p>
              </div>
            </article>
            <article>
              <Download aria-hidden="true" />
              <div>
                <h3>Backup na żądanie</h3>
                <p>Wykonaj kopię w dowolnym momencie.</p>
              </div>
            </article>
            <article>
              <Archive aria-hidden="true" />
              <div>
                <h3>Pełny zakres</h3>
                <p>
                  Baza, dokumenty, załączniki, zdjęcia broni i konfiguracja.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="open-source" className="section open-source-section">
        <div className="page-width open-source-grid">
          <div className="section-heading">
            <p className="eyebrow">Open Source</p>
            <h2>Naprawdę bezpłatny i otwarty</h2>
            <p>
              Możesz pobrać, uruchomić, analizować kod i dostosować aplikację do
              własnych potrzeb. PMBP jest rozwijany z myślą o społeczności.
            </p>
            <div className="open-actions">
              <a
                className="button button-primary"
                href={siteConfig.downloadHref}
              >
                <Download size={18} aria-hidden="true" /> Pobierz najnowszą
                wersję
              </a>
              <a
                className="button button-dark-outline"
                href={siteConfig.githubHref}
              >
                <Code2 size={18} aria-hidden="true" /> Zobacz kod na GitHub
              </a>
            </div>
          </div>
          <div className="stats-grid" aria-label="Koszt i licencja">
            <article>
              <strong>0 zł</strong>
              <span>za aplikację</span>
            </article>
            <article>
              <strong>0 zł</strong>
              <span>miesięcznie</span>
            </article>
            <article>
              <Code2 aria-hidden="true" />
              <strong>Open Source</strong>
              <span>publiczny kod źródłowy</span>
            </article>
          </div>
        </div>
      </section>

      <section id="wsparcie" className="section support-section">
        <div className="page-width support-card">
          <div>
            <p className="eyebrow eyebrow-light">
              Wsparcie techniczne i serwis
            </p>
            <h2>Potrzebujesz pomocy?</h2>
            <p>
              Pomagamy w instalacji, konfiguracji, aktualizacjach i
              rozwiązywaniu problemów technicznych.
            </p>
            <small>Wsparcie techniczne świadczy Integral Dot sp. z o.o.</small>
          </div>
          <a
            className="button button-red support-button"
            href={siteConfig.supportPhoneHref}
          >
            <Phone size={19} aria-hidden="true" /> Zadzwoń:{' '}
            {siteConfig.supportPhoneDisplay}
          </a>
        </div>
      </section>

      <section className="section final-cta">
        <div className="page-width">
          <ShieldCheck aria-hidden="true" />
          <h2>Sprawdź PMBP na własnych danych testowych</h2>
          <p>
            Poproś o dostęp do wersji demonstracyjnej i zobacz cały proces
            ewidencji.
          </p>
          <DemoRequestDialog className="button button-red">
            Wypróbuj demo <ArrowRight size={18} aria-hidden="true" />
          </DemoRequestDialog>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
