/*
  Warnings:

  - You are about to drop the column `divition` on the `projects` table. All the data in the column will be lost.
  - Added the required column `division` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `divition`,
    ADD COLUMN `division` JSON NOT NULL;
