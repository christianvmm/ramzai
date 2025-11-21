-- CreateTable
CREATE TABLE `songs` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `recipient_name` VARCHAR(191) NOT NULL,
    `dedication` TEXT NOT NULL,
    `lyrics` TEXT NOT NULL,
    `audio_url` VARCHAR(191) NOT NULL,
    `audio_preview_url` VARCHAR(191) NOT NULL,
    `cover_image` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
