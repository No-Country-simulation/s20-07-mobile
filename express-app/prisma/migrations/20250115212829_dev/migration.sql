/*
  Warnings:

  - Added the required column `cm` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `size` ADD COLUMN `cm` INTEGER NOT NULL;
