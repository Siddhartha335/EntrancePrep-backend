/*
  Warnings:

  - The values [RELIABLE] on the enum `ScheduleType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `category_id` on the `question_banks` table. All the data in the column will be lost.
  - You are about to drop the column `question_id` on the `question_banks` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ScheduleType_new" AS ENUM ('FIXED', 'FLEXIBLE');
ALTER TABLE "question_banks" ALTER COLUMN "schedule_type" TYPE "ScheduleType_new" USING ("schedule_type"::text::"ScheduleType_new");
ALTER TYPE "ScheduleType" RENAME TO "ScheduleType_old";
ALTER TYPE "ScheduleType_new" RENAME TO "ScheduleType";
DROP TYPE "ScheduleType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "question_banks" DROP CONSTRAINT "question_banks_category_id_fkey";

-- DropForeignKey
ALTER TABLE "question_banks" DROP CONSTRAINT "question_banks_question_id_fkey";

-- AlterTable
ALTER TABLE "question_banks" DROP COLUMN "category_id",
DROP COLUMN "question_id";

-- CreateTable
CREATE TABLE "question_bank_categories" (
    "id" SERIAL NOT NULL,
    "question_bank_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "question_bank_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_bank_questions" (
    "id" SERIAL NOT NULL,
    "question_bank_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "question_bank_questions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "question_bank_categories" ADD CONSTRAINT "question_bank_categories_question_bank_id_fkey" FOREIGN KEY ("question_bank_id") REFERENCES "question_banks"("question_bank_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_bank_categories" ADD CONSTRAINT "question_bank_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_bank_questions" ADD CONSTRAINT "question_bank_questions_question_bank_id_fkey" FOREIGN KEY ("question_bank_id") REFERENCES "question_banks"("question_bank_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_bank_questions" ADD CONSTRAINT "question_bank_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
