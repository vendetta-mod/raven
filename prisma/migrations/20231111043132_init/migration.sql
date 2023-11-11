-- CreateEnum
CREATE TYPE "CaseType" AS ENUM ('WARN', 'MUTE', 'UNMUTE', 'KICK', 'BAN', 'UNBAN');

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "type" "CaseType" NOT NULL,
    "reason" TEXT DEFAULT 'No reason provided',
    "moderatorId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);
