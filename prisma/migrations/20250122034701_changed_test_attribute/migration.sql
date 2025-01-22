/*
  Warnings:

  - You are about to drop the column `is_adaptive` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `is_full_length` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `test_description` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the column `test_name` on the `tests` table. All the data in the column will be lost.
  - Added the required column `name` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "is_adaptive",
DROP COLUMN "is_full_length",
DROP COLUMN "test_description",
DROP COLUMN "test_name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "hasNegativeMarking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isAdaptive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;
