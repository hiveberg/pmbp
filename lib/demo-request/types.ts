export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

export type NewDemoRequest = {
  name: string;
  email: string;
  phone: string;
  source?: string;
  ipHash?: string;
  userAgent?: string;
};

export type StoredDemoRequest = NewDemoRequest & {
  id: string;
  status: 'PENDING' | 'PROCESSED' | 'REJECTED';
  notificationStatus: NotificationStatus;
  emailSentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface DemoRequestRepository {
  countRecentByIpHash(ipHash: string, since: Date): Promise<number>;
  create(input: NewDemoRequest): Promise<StoredDemoRequest>;
  findById(id: string): Promise<StoredDemoRequest | null>;
  markNotificationSent(id: string, sentAt: Date): Promise<void>;
  markNotificationFailed(id: string, reason: string): Promise<void>;
}

export type DemoRequestLogger = {
  error(event: {
    category: 'EMAIL_DELIVERY' | 'NOTIFICATION_STATUS_UPDATE';
    demoRequestId: string;
    errorName: string;
  }): void;
};
