/*
  Warnings:

  - You are about to drop the column `address` on the `subgrantpartners` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `subgrantpartners` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `subgrantpartners` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `subgrantpartners` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `subgrantpartners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subgrantpartners` DROP COLUMN `address`,
    DROP COLUMN `contactName`,
    DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    ADD COLUMN `subGrantContactName` VARCHAR(191) NULL,
    ADD COLUMN `subGrantEmail` VARCHAR(191) NULL,
    ADD COLUMN `subGrantName` VARCHAR(191) NULL,
    ADD COLUMN `subGrantPhoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `subgrantAddress` VARCHAR(191) NULL;
