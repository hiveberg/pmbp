import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@/generated/prisma-node/client';

describe('DemoRequest SQLite repository', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    prisma = new PrismaClient({
      adapter: new PrismaBetterSqlite3({ url: ':memory:' }),
    });
    await prisma.$executeRawUnsafe(`
      CREATE TABLE "DemoRequest" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "source" TEXT,
        "ipHash" TEXT,
        "userAgent" TEXT,
        "notificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
        "notificationLastError" TEXT,
        "emailSentAt" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);
  });

  afterEach(async () => prisma.$disconnect());

  it('saves a valid request as PENDING', async () => {
    const saved = await prisma.demoRequest.create({
      data: {
        name: 'Anna Nowak',
        email: 'anna@example.com',
        phone: '+48 501 502 503',
        source: 'test',
        status: 'PENDING',
        notificationStatus: 'PENDING',
      },
    });

    expect(saved.id).toBeTruthy();
    expect(saved.status).toBe('PENDING');
    expect(saved.notificationStatus).toBe('PENDING');
    await expect(prisma.demoRequest.count()).resolves.toBe(1);
  });
});
