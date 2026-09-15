import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPrismaClient } from '@/lib/db/prisma';
import { createDemoRequestRepository } from '@/lib/demo-request/prisma-repository';
import {
  DemoRequestRateLimitError,
  submitDemoRequest,
} from '@/lib/demo-request/service';
import { createDemoRequestNotifier } from '@/lib/email/demo-notification';
import { getClientIp, hashClientIp } from '@/lib/security/request';
import {
  demoRequestSchema,
  normalizeDemoRequest,
} from '@/lib/validation/demo-request';

const GENERIC_ERROR =
  'Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę.';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: GENERIC_ERROR },
      { status: 400 },
    );
  }

  const validation = demoRequestSchema.safeParse(body);
  if (!validation.success) {
    const errorTree = z.treeifyError(validation.error);
    const fieldErrors = Object.fromEntries(
      Object.entries(errorTree.properties ?? {}).map(([field, details]) => [
        field,
        details.errors,
      ]),
    );
    return NextResponse.json(
      {
        ok: false,
        message: 'Sprawdź zaznaczone pola.',
        fieldErrors,
      },
      { status: 422 },
    );
  }

  if (validation.data.website) {
    return NextResponse.json({ ok: true });
  }

  const normalized = normalizeDemoRequest(validation.data);
  const repository = createDemoRequestRepository(getPrismaClient());

  try {
    const ipHash = await hashClientIp(
      getClientIp(request.headers),
      process.env.RATE_LIMIT_SALT ?? '',
    );
    const saved = await submitDemoRequest(
      {
        ...normalized,
        source: 'website-demo-form',
        ipHash,
        userAgent:
          request.headers.get('user-agent')?.slice(0, 400) ?? undefined,
      },
      {
        repository,
        sendNotification: createDemoRequestNotifier({
          RESEND_API_KEY: process.env.RESEND_API_KEY,
          EMAIL_FROM: process.env.EMAIL_FROM,
          DEMO_NOTIFICATION_EMAIL_1: process.env.DEMO_NOTIFICATION_EMAIL_1,
          DEMO_NOTIFICATION_EMAIL_2: process.env.DEMO_NOTIFICATION_EMAIL_2,
          DEMO_NOTIFICATION_EMAILS: process.env.DEMO_NOTIFICATION_EMAILS,
        }),
        logger: console,
      },
    );

    return NextResponse.json({ ok: true, id: saved.id });
  } catch (error) {
    if (error instanceof DemoRequestRateLimitError) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 429 },
      );
    }

    console.error('[demo-request]', {
      category: 'DATABASE_OR_REQUEST',
      errorName: error instanceof Error ? error.name : 'UnknownError',
    });
    return NextResponse.json(
      { ok: false, message: GENERIC_ERROR },
      { status: 500 },
    );
  }
}
