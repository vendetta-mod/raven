/*
  Warnings:

  - The values [UNMUTE] on the enum `CaseType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `expiresAt` on the `Case` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CaseType_new" AS ENUM ('WARN', 'MUTE', 'KICK', 'BAN', 'UNBAN');
ALTER TABLE "Case" ALTER COLUMN "type" TYPE "CaseType_new" USING ("type"::text::"CaseType_new");
ALTER TYPE "CaseType" RENAME TO "CaseType_old";
ALTER TYPE "CaseType_new" RENAME TO "CaseType";
DROP TYPE "CaseType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "expiresAt";
