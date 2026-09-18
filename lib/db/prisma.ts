import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required to connect to PostgreSQL.');
  }

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });
}

export function getPrismaClient() {
  globalForPrisma.prisma ??= createPrismaClient();
  return globalForPrisma.prisma;
}
