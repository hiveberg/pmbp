import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run e2e:prepare && npm run e2e:serve',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_SITE_URL: 'https://www.pmbp.pl',
      NEXT_PUBLIC_PMBP_GITHUB_URL: 'https://github.com/example/pmbp',
      NEXT_PUBLIC_PMBP_DOWNLOAD_URL: '',
      DATABASE_URL:
        process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL ?? '',
    },
  },
});
