'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  demoRequestSchema,
  type DemoRequestInput,
} from '@/lib/validation/demo-request';

type DemoRequestFormProps = {
  onComplete?: () => void;
  compact?: boolean;
};

type ApiResponse = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof DemoRequestInput, string[]>>;
};

export function DemoRequestForm({
  onComplete,
  compact = false,
}: DemoRequestFormProps) {
  const [succeeded, setSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequestInput>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(undefined);

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as ApiResponse;

      if (!response.ok || !result.ok) {
        for (const [field, messages] of Object.entries(
          result.fieldErrors ?? {},
        )) {
          const message = messages?.[0];
          if (message) {
            setError(field as keyof DemoRequestInput, {
              type: 'server',
              message,
            });
          }
        }
        setSubmitError(
          result.message ||
            'Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.',
        );
        return;
      }

      reset();
      setSucceeded(true);
    } catch {
      setSubmitError(
        'Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.',
      );
    }
  });

  if (succeeded) {
    return (
      <section className="success-panel" aria-live="polite">
        <span className="success-icon">
          <CheckCircle2 size={34} aria-hidden="true" />
        </span>
        <h2>Dziękujemy!</h2>
        <p>Twoja prośba o dostęp do wersji demonstracyjnej została przyjęta.</p>
        <p>
          Wkrótce ją przetworzymy i wyślemy link do wersji demonstracyjnej na
          podany adres e-mail.
        </p>
        {onComplete ? (
          <button
            className="button button-primary form-submit"
            onClick={onComplete}
          >
            Zamknij
          </button>
        ) : (
          <Link className="button button-primary form-submit" href="/">
            Wróć na stronę
          </Link>
        )}
      </section>
    );
  }

  return (
    <form
      className={compact ? 'demo-form compact' : 'demo-form'}
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-field">
        <label htmlFor="demo-name">Imię i nazwisko *</label>
        <Input
          id="demo-name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register('name')}
        />
        {errors.name && <p className="field-error">{errors.name.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="demo-email">E-mail *</label>
        <Input
          id="demo-email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && <p className="field-error">{errors.email.message}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="demo-phone">Telefon *</label>
        <Input
          id="demo-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          {...register('phone')}
        />
        {errors.phone && <p className="field-error">{errors.phone.message}</p>}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="demo-website">Strona internetowa</label>
        <input
          id="demo-website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="consent-field">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              id="demo-consent"
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={Boolean(errors.consent)}
            />
          )}
        />
        <label htmlFor="demo-consent">
          Wyrażam zgodę na przetwarzanie podanych danych w celu obsługi mojego
          zgłoszenia. <Link href="/privacy">Polityka prywatności</Link>
        </label>
      </div>
      {errors.consent && (
        <p className="field-error consent-error">{errors.consent.message}</p>
      )}

      {submitError && (
        <p className="submit-error" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        className="button button-red form-submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="spin" size={18} aria-hidden="true" />
            Wysyłanie...
          </>
        ) : (
          'Poproś o dostęp do demo'
        )}
      </button>
    </form>
  );
}
