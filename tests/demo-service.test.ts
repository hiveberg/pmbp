/* oxlint-disable typescript/unbound-method -- repository methods are Vitest mocks */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { submitDemoRequest } from '@/lib/demo-request/service';
import type {
  DemoRequestRepository,
  StoredDemoRequest,
} from '@/lib/demo-request/types';

const stored: StoredDemoRequest = {
  id: 'demo_1',
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  phone: '+48 500 600 700',
  status: 'PENDING',
  notificationStatus: 'PENDING',
  emailSentAt: null,
  createdAt: new Date('2026-09-15T10:00:00Z'),
  updatedAt: new Date('2026-09-15T10:00:00Z'),
};

function createRepository(): DemoRequestRepository {
  return {
    countRecentByIpHash: vi.fn().mockResolvedValue(0),
    create: vi.fn().mockResolvedValue(stored),
    findById: vi.fn().mockResolvedValue(stored),
    markNotificationSent: vi.fn().mockResolvedValue(undefined),
    markNotificationFailed: vi.fn().mockResolvedValue(undefined),
  };
}

describe('submitDemoRequest', () => {
  const logger = { error: vi.fn() };

  beforeEach(() => vi.clearAllMocks());

  it('saves the request before sending notification', async () => {
    const calls: string[] = [];
    const repository = createRepository();
    vi.mocked(repository.create).mockImplementation(async () => {
      calls.push('database');
      return stored;
    });
    const sendNotification = vi.fn(async () => {
      calls.push('email');
    });

    await submitDemoRequest(stored, {
      repository,
      sendNotification,
      logger,
    });

    expect(calls).toEqual(['database', 'email']);
    expect(repository.markNotificationSent).toHaveBeenCalledWith(
      stored.id,
      expect.any(Date),
    );
  });

  it('does not call e-mail when the database save fails', async () => {
    const repository = createRepository();
    vi.mocked(repository.create).mockRejectedValue(
      new Error('database offline'),
    );
    const sendNotification = vi.fn();

    await expect(
      submitDemoRequest(stored, { repository, sendNotification, logger }),
    ).rejects.toThrow('database offline');
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it('keeps the saved record and marks notification failed on e-mail error', async () => {
    const repository = createRepository();
    const sendNotification = vi
      .fn()
      .mockRejectedValue(new Error('SMTP/API offline'));

    const result = await submitDemoRequest(stored, {
      repository,
      sendNotification,
      logger,
    });

    expect(result.id).toBe(stored.id);
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.markNotificationFailed).toHaveBeenCalledWith(
      stored.id,
      expect.stringContaining('SMTP/API offline'),
    );
  });
});
