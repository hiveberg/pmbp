# PMBP — Polski Magazyn Broni Palnej

Produkcyjna witryna aplikacji PMBP z formularzem dostępu do demo. Aplikacja
działa jako jeden projekt full-stack oparty o App Router, React, TypeScript,
Prisma ORM i SQLite (Cloudflare D1 na hostingu Sites).

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

Domyślny lokalny plik SQLite jest wskazywany przez `DATABASE_URL`. Podgląd Sites
korzysta z lokalnego emulatora D1; po pierwszym buildzie schemat można załadować
poleceniem `npm run db:migrate:local-d1`.

## Formularz demo

Żądanie przechodzi walidację Zod po stronie klienta i serwera, honeypot oraz
łagodny limit pięciu zgłoszeń z jednego skrótu IP w ciągu 15 minut. Surowy adres
IP nie jest przechowywany.

Kolejność operacji jest celowa:

1. rekord `DemoRequest` zostaje zapisany w SQLite ze statusem `PENDING`;
2. dopiero po udanym zapisie wysyłane jest powiadomienie e-mail;
3. wynik powiadomienia zapisuje się jako `SENT` lub `FAILED`.

Awaria dostawcy e-mail nie usuwa rekordu i nie zmienia sukcesu widocznego dla
użytkownika. Zgłoszenia ze statusem `FAILED` albo `PENDING` można później ponowić
przez funkcję `retryDemoRequestNotification` w warstwie serwisowej.

## Zmienne środowiskowe

- `NEXT_PUBLIC_SITE_URL` — publiczny adres witryny;
- `NEXT_PUBLIC_PMBP_GITHUB_URL` — repozytorium GitHub;
- `NEXT_PUBLIC_PMBP_DOWNLOAD_URL` — opcjonalny bezpośredni link pobierania;
- `DATABASE_URL` — lokalny plik SQLite dla narzędzi Prisma;
- `DEMO_NOTIFICATION_EMAIL_1`, `DEMO_NOTIFICATION_EMAIL_2` — odbiorcy;
- `DEMO_NOTIFICATION_EMAILS` — opcjonalna lista odbiorców po przecinku;
- `RESEND_API_KEY`, `EMAIL_FROM` — dostawca powiadomień e-mail;
- `RATE_LIMIT_SALT` — prywatna sól do haszowania adresów IP.

Warstwa e-mail jest oddzielona od logiki zgłoszeń. Implementacja używa API HTTPS
Resend, ponieważ docelowy runtime Cloudflare Workers nie obsługuje połączeń SMTP
przez surowe gniazda TCP. Sekretów nie należy commitować.

## Baza danych

Model Prisma znajduje się w `prisma/schema.prisma`, a migracja SQLite w
`prisma/migrations`. Kopia SQL w `drizzle/` służy mechanizmowi migracji bazy D1
podczas publikacji w Sites.

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Jakość i build

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Build produkcyjny uruchamia się przez `npm run start`.

## Wdrożenie

Przed publikacją ustaw wszystkie zmienne z `.env.example`, rzeczywisty adres
repozytorium GitHub, dwóch odbiorców powiadomień oraz wartości dostawcy e-mail.
Uzupełnij także oznaczone dane administratora w polityce prywatności. Baza D1
musi otrzymać migrację przed uruchomieniem formularza.
