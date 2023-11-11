/*
  Warnings:

  - Made the column `reason` on table `Case` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Case" ALTER COLUMN "reason" SET NOT NULL;
