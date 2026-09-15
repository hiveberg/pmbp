import { describe, expect, it } from 'vitest';
import { demoRequestSchema } from '@/lib/validation/demo-request';

const valid = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  phone: '+48 500 600 700',
  consent: true,
  website: '',
};

describe('demoRequestSchema', () => {
  it('rejects an empty name', () => {
    expect(demoRequestSchema.safeParse({ ...valid, name: '' }).success).toBe(
      false,
    );
  });

  it('rejects an invalid e-mail', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, email: 'not-an-email' }).success,
    ).toBe(false);
  });

  it('rejects an empty phone', () => {
    expect(demoRequestSchema.safeParse({ ...valid, phone: '' }).success).toBe(
      false,
    );
  });

  it('rejects missing consent', () => {
    expect(
      demoRequestSchema.safeParse({ ...valid, consent: false }).success,
    ).toBe(false);
  });

  it('accepts Polish and international phone formatting', () => {
    expect(demoRequestSchema.safeParse(valid).success).toBe(true);
    expect(
      demoRequestSchema.safeParse({ ...valid, phone: '+44 (0)20 7946 0958' })
        .success,
    ).toBe(true);
  });
});
