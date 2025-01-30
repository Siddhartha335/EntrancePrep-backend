-- CreateEnum
CREATE TYPE "ScheduleType" AS ENUM ('FIXED', 'RELIABLE');

-- CreateTable
CREATE TABLE "question_banks" (
    "question_bank_id" SERIAL NOT NULL,
    "schedule_type" "ScheduleType" NOT NULL,
    "category_id" INTEGER NOT NULL,
    "test_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "question_banks_pkey" PRIMARY KEY ("question_bank_id")
);

-- AddForeignKey
ALTER TABLE "question_banks" ADD CONSTRAINT "question_banks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_banks" ADD CONSTRAINT "question_banks_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_banks" ADD CONSTRAINT "question_banks_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;
