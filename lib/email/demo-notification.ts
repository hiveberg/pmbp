import { z } from 'zod';
import type { StoredDemoRequest } from '@/lib/demo-request/types';

const emailEnvSchema = z.object({
  RESEND_API_KEY: z
    .string({ error: 'Brak RESEND_API_KEY.' })
    .min(1, 'Brak RESEND_API_KEY.'),
  EMAIL_FROM: z
    .string({ error: 'Brak EMAIL_FROM.' })
    .min(3, 'Brak EMAIL_FROM.'),
});

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailConfigurationError';
  }
}

export class EmailDeliveryError extends Error {
  constructor(status: number) {
    super(`Dostawca e-mail odrzucił żądanie (HTTP ${status}).`);
    this.name = 'EmailDeliveryError';
  }
}

export type EmailRuntimeEnv = {
  RESEND_API_KEY?: string;
  EMAIL_FROM?: string;
  DEMO_NOTIFICATION_EMAIL_1?: string;
  DEMO_NOTIFICATION_EMAIL_2?: string;
  DEMO_NOTIFICATION_EMAILS?: string;
};

function parseRecipients(env: EmailRuntimeEnv) {
  const values = [
    env.DEMO_NOTIFICATION_EMAIL_1,
    env.DEMO_NOTIFICATION_EMAIL_2,
    ...(env.DEMO_NOTIFICATION_EMAILS?.split(',') ?? []),
  ];
  const recipients = [
    ...new Set(values.map((value) => value?.trim()).filter(Boolean)),
  ];
  const valid = recipients.filter(
    (recipient): recipient is string => z.email().safeParse(recipient).success,
  );

  if (valid.length < 2) {
    throw new EmailConfigurationError(
      'Skonfiguruj co najmniej dwóch poprawnych odbiorców powiadomień demo.',
    );
  }

  return valid;
}

export function getEmailConfig(env: EmailRuntimeEnv) {
  const result = emailEnvSchema.safeParse(env);
  if (!result.success) {
    throw new EmailConfigurationError(
      result.error.issues.map((issue) => issue.message).join(' '),
    );
  }

  return {
    apiKey: result.data.RESEND_API_KEY,
    from: result.data.EMAIL_FROM,
    recipients: parseRecipients(env),
  };
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[
        character
      ] ?? character,
  );
}

export function renderDemoNotification(request: StoredDemoRequest) {
  const date = new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Warsaw',
  }).format(request.createdAt);

  const text = [
    'Nowa prośba o dostęp do wersji demonstracyjnej.',
    '',
    `Imię i nazwisko: ${request.name}`,
    `E-mail: ${request.email}`,
    `Telefon: ${request.phone}`,
    `Data: ${date}`,
    'Status: PENDING',
  ].join('\n');

  const html = `
    <h1 style="font:600 22px/1.3 Arial,sans-serif;color:#0b1d33">Nowa prośba o dostęp do wersji demonstracyjnej</h1>
    <table cellpadding="6" cellspacing="0" style="font:15px/1.5 Arial,sans-serif;color:#24364d">
      <tr><th align="left">Imię i nazwisko:</th><td>${escapeHtml(request.name)}</td></tr>
      <tr><th align="left">E-mail:</th><td>${escapeHtml(request.email)}</td></tr>
      <tr><th align="left">Telefon:</th><td>${escapeHtml(request.phone)}</td></tr>
      <tr><th align="left">Data:</th><td>${escapeHtml(date)}</td></tr>
      <tr><th align="left">Status:</th><td>PENDING</td></tr>
    </table>
  `.trim();

  return { text, html };
}

export function createDemoRequestNotifier(
  env: EmailRuntimeEnv,
  fetcher: typeof fetch = fetch,
) {
  return async (request: StoredDemoRequest) => {
    const config = getEmailConfig(env);
    const body = renderDemoNotification(request);
    const response = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.from,
        to: config.recipients,
        subject: 'Nowa prośba o dostęp do demo PMBP',
        text: body.text,
        html: body.html,
      }),
    });

    if (!response.ok) throw new EmailDeliveryError(response.status);
  };
}
