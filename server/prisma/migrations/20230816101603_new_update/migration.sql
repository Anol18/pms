/*
  Warnings:

  - You are about to alter the column `projectBudget` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `projects` MODIFY `projectBudget` INTEGER NOT NULL;
