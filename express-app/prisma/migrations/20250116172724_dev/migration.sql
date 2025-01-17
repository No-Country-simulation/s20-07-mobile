-- AlterTable
ALTER TABLE `Pizza` ADD COLUMN `featured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `haveDiscount` BOOLEAN NOT NULL DEFAULT false;
