/*
  Warnings:

  - You are about to drop the column `test_type` on the `tests` table. All the data in the column will be lost.
  - Added the required column `test_types` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "test_type",
ADD COLUMN     "test_types" TEXT NOT NULL;
