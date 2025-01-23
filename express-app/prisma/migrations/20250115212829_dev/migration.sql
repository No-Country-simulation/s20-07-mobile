/*
  Warnings:

  - Added the required column `cm` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
use custompizza;
-- AlterTable
ALTER TABLE `Size` ADD COLUMN `cm` INTEGER NOT NULL;
