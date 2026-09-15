-- CreateEnum
CREATE TYPE "DemoRequestStatus" AS ENUM ('PENDING', 'PROCESSED', 'REJECTED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "DemoRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "DemoRequestStatus" NOT NULL DEFAULT 'PENDING',
    "source" TEXT,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "notificationStatus" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "notificationLastError" TEXT,
    "emailSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DemoRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_demo_requests_email_created_at" ON "DemoRequest"("email", "createdAt");

-- CreateIndex
CREATE INDEX "idx_demo_requests_ip_hash_created_at" ON "DemoRequest"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "idx_demo_requests_notification_created_at" ON "DemoRequest"("notificationStatus", "createdAt");
