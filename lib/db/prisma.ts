import { PrismaD1 } from '@prisma/adapter-d1';
import { PrismaClient } from '@/generated/prisma/client';

export function createPrismaClient(database: D1Database) {
  return new PrismaClient({ adapter: new PrismaD1(database) });
}
