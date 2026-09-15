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
);

CREATE INDEX "idx_demo_requests_email_created_at"
ON "DemoRequest"("email", "createdAt");

CREATE INDEX "idx_demo_requests_ip_hash_created_at"
ON "DemoRequest"("ipHash", "createdAt");

CREATE INDEX "idx_demo_requests_notification_created_at"
ON "DemoRequest"("notificationStatus", "createdAt");

PRAGMA optimize;
