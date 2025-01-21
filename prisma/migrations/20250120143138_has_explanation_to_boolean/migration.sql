/*
  Warnings:

  - Added the required column `has_explanation` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "has_explanation",
ADD COLUMN     "has_explanation" BOOLEAN NOT NULL;
