/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `songs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lyrics_preview` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `songs` ADD COLUMN `lyrics_preview` VARCHAR(191) NOT NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `songs_slug_key` ON `songs`(`slug`);
