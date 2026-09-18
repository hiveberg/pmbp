# PMBP — Polski Magazyn Broni Palnej

Produkcyjna witryna aplikacji PMBP z formularzem dostępu do demo. Aplikacja
działa jako jeden projekt full-stack oparty o App Router, React, TypeScript,
Prisma ORM i PostgreSQL. Docelowym środowiskiem wdrożeniowym jest Railway.

## Uruchomienie lokalne

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate # wymaga działającego PostgreSQL
npm run dev
```

`DATABASE_URL` wskazuje bazę PostgreSQL. Lokalnie może to być kontener lub zwykła
instalacja PostgreSQL; na Railway zmienna powinna referować usługę Postgres.

## Formularz demo

Żądanie przechodzi walidację Zod po stronie klienta i serwera, honeypot oraz
łagodny limit pięciu zgłoszeń z jednego skrótu IP w ciągu 15 minut. Surowy adres
IP nie jest przechowywany.

Kolejność operacji jest celowa:

1. rekord `DemoRequest` zostaje zapisany w PostgreSQL ze statusem `PENDING`;
2. dopiero po udanym zapisie wysyłane jest powiadomienie e-mail;
3. wynik powiadomienia zapisuje się jako `SENT` lub `FAILED`.

Awaria dostawcy e-mail nie usuwa rekordu i nie zmienia sukcesu widocznego dla
użytkownika. Zgłoszenia ze statusem `FAILED` albo `PENDING` można później ponowić
przez funkcję `retryDemoRequestNotification` w warstwie serwisowej.

## Zmienne środowiskowe

- `NEXT_PUBLIC_SITE_URL` — publiczny adres witryny;
- `NEXT_PUBLIC_PMBP_GITHUB_URL` — repozytorium GitHub;
- `NEXT_PUBLIC_PMBP_DOWNLOAD_URL` — opcjonalny bezpośredni link pobierania;
- `DATABASE_URL` — adres połączenia PostgreSQL używany przez aplikację i Prisma;
- `DEMO_NOTIFICATION_EMAIL_1`, `DEMO_NOTIFICATION_EMAIL_2` — odbiorcy;
- `DEMO_NOTIFICATION_EMAILS` — opcjonalna lista odbiorców po przecinku;
- `RESEND_API_KEY`, `EMAIL_FROM` — dostawca powiadomień e-mail;
- `RATE_LIMIT_SALT` — prywatna sól do haszowania adresów IP.

Warstwa e-mail jest oddzielona od logiki zgłoszeń. Implementacja nadal używa API
HTTPS Resend, a błąd dostawcy nie powoduje utraty rekordu. Sekretów nie należy
commitować.

## Baza danych

Model Prisma znajduje się w `prisma/schema.prisma`, a wersjonowana migracja
PostgreSQL w `prisma/migrations`.

```bash
npm run db:generate
npm run db:migrate
npm run db:status
npm run db:studio
```

Test integracyjny repozytorium wymaga osobnej bazy i zmiennej
`TEST_DATABASE_URL`. Pozostałe testy jednostkowe działają bez bazy.

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

Plik `railway.json` ustawia build, start, healthcheck oraz `npm run db:migrate`
jako krok pre-deploy. W projekcie Railway:

1. dodaj usługę PostgreSQL;
2. ustaw w usłudze aplikacji `DATABASE_URL=${{Postgres.DATABASE_URL}}`;
3. ustaw pozostałe zmienne z `.env.example`, w tym odbiorców i konfigurację
   Resend;
4. wdrożenie zastosuje migracje przed przełączeniem ruchu na nową wersję.

Skrypt `npm run start` wykonuje dodatkowo idempotentne `prisma migrate deploy`
przed uruchomieniem Next.js. Jest to zabezpieczenie na wypadek pominięcia kroku
pre-deploy przez konfigurację usługi Railway.

Uzupełnij także oznaczone dane administratora w polityce prywatności.
