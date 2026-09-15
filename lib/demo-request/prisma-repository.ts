import type { PrismaClient } from '@/generated/prisma/client';
import type {
  DemoRequestRepository,
  NewDemoRequest,
  StoredDemoRequest,
} from './types';

function toStoredRequest(record: {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  source: string | null;
  ipHash: string | null;
  userAgent: string | null;
  notificationStatus: string;
  emailSentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): StoredDemoRequest {
  return {
    id: record.id,
    name: record.name,
    email: record.email,
    phone: record.phone,
    status: record.status as StoredDemoRequest['status'],
    source: record.source ?? undefined,
    ipHash: record.ipHash ?? undefined,
    userAgent: record.userAgent ?? undefined,
    notificationStatus:
      record.notificationStatus as StoredDemoRequest['notificationStatus'],
    emailSentAt: record.emailSentAt,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function createDemoRequestRepository(
  prisma: PrismaClient,
): DemoRequestRepository {
  return {
    async countRecentByIpHash(ipHash, since) {
      return prisma.demoRequest.count({
        where: { ipHash, createdAt: { gte: since } },
      });
    },

    async create(input: NewDemoRequest) {
      const record = await prisma.demoRequest.create({
        data: {
          ...input,
          status: 'PENDING',
          notificationStatus: 'PENDING',
        },
      });
      return toStoredRequest(record);
    },

    async findById(id) {
      const record = await prisma.demoRequest.findUnique({ where: { id } });
      return record ? toStoredRequest(record) : null;
    },

    async markNotificationSent(id, sentAt) {
      await prisma.demoRequest.update({
        where: { id },
        data: {
          notificationStatus: 'SENT',
          notificationLastError: null,
          emailSentAt: sentAt,
        },
      });
    },

    async markNotificationFailed(id, reason) {
      await prisma.demoRequest.update({
        where: { id },
        data: {
          notificationStatus: 'FAILED',
          notificationLastError: reason.slice(0, 240),
        },
      });
    },
  };
}
