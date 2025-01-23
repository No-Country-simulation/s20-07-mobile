use custompizza;
-- CreateTable
CREATE TABLE `Drink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NULL,
    `isAlcoholic` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(191) NOT NULL DEFAULT 'drink',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
