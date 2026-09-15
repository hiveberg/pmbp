import { describe, expect, it } from 'vitest';
import {
  EmailConfigurationError,
  getEmailConfig,
} from '@/lib/email/demo-notification';

describe('e-mail configuration', () => {
  it('returns a clear error when mail configuration is missing', () => {
    expect(() => getEmailConfig({})).toThrow(EmailConfigurationError);
    expect(() => getEmailConfig({})).toThrow('Brak RESEND_API_KEY');
  });

  it('requires two notification recipients', () => {
    expect(() =>
      getEmailConfig({
        RESEND_API_KEY: 'test-key',
        EMAIL_FROM: 'PMBP <mail@example.com>',
        DEMO_NOTIFICATION_EMAIL_1: 'one@example.com',
      }),
    ).toThrow('co najmniej dwóch');
  });
});
