/*
  Warnings:

  - You are about to drop the column `category_name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `is_Active` on the `categories` table. All the data in the column will be lost.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "category_name",
DROP COLUMN "is_Active",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL;
