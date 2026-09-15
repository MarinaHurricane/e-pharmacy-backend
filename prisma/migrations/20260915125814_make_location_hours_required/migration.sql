/*
  Warnings:

  - Made the column `closeTime` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `openTime` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "closeTime" SET NOT NULL,
ALTER COLUMN "openTime" SET NOT NULL;
