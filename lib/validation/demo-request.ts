import { z } from 'zod';

const normalizedPhone = (value: string) => value.replace(/[\s().-]/g, '');

export const demoRequestSchema = z.object({
  name: z
    .string()
    .min(1, 'Podaj imię i nazwisko.')
    .max(120, 'Imię i nazwisko może mieć maksymalnie 120 znaków.')
    .refine((value) => value.trim().length >= 2, 'Podaj imię i nazwisko.'),
  email: z
    .email({ error: 'Podaj poprawny adres e-mail.' })
    .max(254, 'Adres e-mail jest zbyt długi.'),
  phone: z
    .string()
    .min(1, 'Podaj numer telefonu.')
    .max(30, 'Numer telefonu jest zbyt długi.')
    .refine(
      (value) => /^\+?\d{7,15}$/.test(normalizedPhone(value)),
      'Podaj poprawny numer telefonu.',
    ),
  consent: z
    .boolean()
    .refine((value) => value, 'Zgoda jest wymagana do obsługi zgłoszenia.'),
  website: z.string().max(0),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

export function normalizeDemoRequest(input: DemoRequestInput) {
  return {
    name: input.name.trim().replace(/\s+/g, ' '),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim().replace(/\s+/g, ' '),
  };
}
