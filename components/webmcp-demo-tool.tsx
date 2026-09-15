'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { demoRequestSchema } from '@/lib/validation/demo-request';

type ApiResult = { ok: boolean; id?: string; message?: string };

export function WebMcpDemoTool() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const tool = {
      name: 'submit_demo_request',
      title: 'Poproś o dostęp do demo PMBP',
      description:
        'Zapisuje prośbę o dostęp do wersji demonstracyjnej PMBP. Wymaga świadomej zgody na przetwarzanie danych.',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 120 },
          email: { type: 'string', format: 'email', maxLength: 254 },
          phone: { type: 'string', minLength: 7, maxLength: 30 },
          consent: { type: 'boolean', const: true },
        },
        required: ['name', 'email', 'phone', 'consent'],
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      async execute(input: unknown) {
        const validated = demoRequestSchema.parse({
          ...(input as Record<string, unknown>),
          website: '',
        });
        const response = await fetch('/api/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(validated),
        });
        const result = (await response.json()) as ApiResult;
        if (!response.ok || !result.ok) {
          throw new Error(
            result.message || 'Nie udało się zapisać zgłoszenia.',
          );
        }
        setAccepted(true);
        window.setTimeout(() => setAccepted(false), 6000);
        return { status: 'accepted', requestId: result.id };
      },
    };

    try {
      void Promise.resolve(
        context.registerTool(tool, { signal: lifecycle.signal }),
      ).catch(() => undefined);
    } catch {
      // WebMCP is progressive enhancement; the visible form remains available.
    }

    return () => lifecycle.abort();
  }, []);

  if (!accepted) return null;

  return (
    <output className="webmcp-toast">
      <CheckCircle2 aria-hidden="true" />
      Zgłoszenie demo zostało zapisane.
    </output>
  );
}
