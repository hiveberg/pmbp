import { expect, test } from '@playwright/test';

test('demo request is accepted and the success state is shown', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('button', { name: /wypróbuj demo/i })
    .first()
    .click();
  await page.getByLabel('Imię i nazwisko *').fill('Jan Kowalski');
  await page.getByLabel('E-mail *').fill('jan@example.com');
  await page.getByLabel('Telefon *').fill('+48 500 600 700');
  await page.getByRole('checkbox', { name: /wyrażam zgodę/i }).check();
  await page.getByRole('button', { name: /poproś o dostęp/i }).click();

  await expect(
    page.getByRole('heading', { name: 'Dziękujemy!' }),
  ).toBeVisible();
  await expect(page.getByText(/prośba.*została przyjęta/i)).toBeVisible();
});

test('GitHub and support links use configured values', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: /zobacz kod na github/i }),
  ).toHaveAttribute('href', 'https://github.com/example/pmbp');
  await expect(page.getByRole('link', { name: /zadzwoń/i })).toHaveAttribute(
    'href',
    'tel:+48796073632',
  );
});
