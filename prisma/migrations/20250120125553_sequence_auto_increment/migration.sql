-- AlterTable
CREATE SEQUENCE test_questions_sequence_seq;
ALTER TABLE "test_questions" ALTER COLUMN "sequence" SET DEFAULT nextval('test_questions_sequence_seq');
ALTER SEQUENCE test_questions_sequence_seq OWNED BY "test_questions"."sequence";
