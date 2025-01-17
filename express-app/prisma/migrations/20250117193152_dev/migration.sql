-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `drinkId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_drinkId_fkey` FOREIGN KEY (`drinkId`) REFERENCES `Drink`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
