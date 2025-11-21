/*
  Warnings:

  - Added the required column `payment_link` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_payment_link_id` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_price_id` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_product_id` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `songs` ADD COLUMN `payment_link` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripe_payment_link_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripe_price_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripe_product_id` VARCHAR(191) NOT NULL;
