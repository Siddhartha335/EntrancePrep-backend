/*
  Warnings:

  - You are about to drop the column `correct_answer` on the `questions` table. All the data in the column will be lost.
  - Added the required column `question_type` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `right_answer` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_type` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "correct_answer",
ADD COLUMN     "answers" TEXT[],
ADD COLUMN     "has_explanation" BOOLEAN,
ADD COLUMN     "marks_of_question" INTEGER,
ADD COLUMN     "question_type" TEXT NOT NULL,
ADD COLUMN     "right_answer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "test_type" TEXT NOT NULL;
