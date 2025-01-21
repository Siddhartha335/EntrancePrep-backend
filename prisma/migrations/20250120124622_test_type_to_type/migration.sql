/*
  Warnings:

  - You are about to drop the column `test_types` on the `tests` table. All the data in the column will be lost.
  - Added the required column `type` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "test_types",
ADD COLUMN     "type" TEXT NOT NULL;
