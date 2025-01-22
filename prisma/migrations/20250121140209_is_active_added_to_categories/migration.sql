/*
  Warnings:

  - Added the required column `is_Active` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "is_Active" BOOLEAN NOT NULL;
