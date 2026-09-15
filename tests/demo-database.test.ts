import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';
import { createDemoRequestRepository } from '@/lib/demo-request/prisma-repository';

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
const describeWithPostgres = testDatabaseUrl ? describe : describe.skip;

describeWithPostgres('DemoRequest PostgreSQL repository', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: testDatabaseUrl! }),
    });
  });

  beforeEach(async () => prisma.demoRequest.deleteMany());

  afterAll(async () => prisma.$disconnect());

  it('saves a valid request as PENDING', async () => {
    const repository = createDemoRequestRepository(prisma);
    const saved = await repository.create({
      name: 'Anna Nowak',
      email: 'anna@example.com',
      phone: '+48 501 502 503',
      source: 'test',
    });

    expect(saved.id).toBeTruthy();
    expect(saved.status).toBe('PENDING');
    expect(saved.notificationStatus).toBe('PENDING');
    await expect(prisma.demoRequest.count()).resolves.toBe(1);
  });
});
