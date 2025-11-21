/*
  Warnings:

  - You are about to drop the column `payment_link` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `stripe_payment_link_id` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `songs` DROP COLUMN `payment_link`,
    DROP COLUMN `stripe_payment_link_id`,
    ADD COLUMN `checkout_url` VARCHAR(191) NULL,
    ADD COLUMN `stripe_session_id` VARCHAR(191) NULL;
