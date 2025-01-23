/*
  Warnings:

  - You are about to drop the column `createdAt` on the `custompizza` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `isCustom` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pizza` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `predefinedpizza` table. All the data in the column will be lost.

*/
use custompizza;
-- AlterTable
ALTER TABLE `CustomPizza` DROP COLUMN `createdAt`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'customPizza';

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Pizza` DROP COLUMN `createdAt`,
    DROP COLUMN `isCustom`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `PredefinedPizza` DROP COLUMN `createdAt`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'predefinedPizza';
