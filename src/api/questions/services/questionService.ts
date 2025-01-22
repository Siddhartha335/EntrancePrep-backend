import prisma from "../../../utils/db.js";

export async function questionCreate(data: any) {
    const { testType, questionType, question_text, answers, correctAnswer, category, subcategory, marks_of_question, difficultyLevel, hasExplanation, explanation } = data;

    try {
        // Step 1: Find or create the main category
        let categoryData = await prisma.category.findFirst({
            where: { name: category }
        });

        if (!categoryData) {
            // If category doesn't exist, create it
            categoryData = await prisma.category.create({
                data: { name: category }
            });
        }

        // Step 2: Create the test
        const test = await prisma.test.create({
            data: {
                name: `${testType} Entrance Test`,
                description: `${testType} Entrance Test`,
                duration: 30,
                category_id: categoryData.category_id,
                type: testType,
            }
        });

        // Step 3: Create the question
        const question = await prisma.question.create({
            data: {
                question_text: question_text,
                category_id: categoryData.category_id,
                difficulty_level: difficultyLevel,
                question_type: questionType,
                answers: answers,
                right_answer: correctAnswer,
                marks_of_question: marks_of_question,
                has_explanation: hasExplanation,
                explanation: explanation,
            }
        });

        // Step 4: Link the question to the test
        await prisma.test_Question.create({
            data: {
                test_id: test.test_id,
                question_id: question.question_id,
            }
        });

        // Step 5: Link subcategories if provided
        if (subcategory) {
            // Step 5.1: Check if subcategory exists
            let subcategoryData = await prisma.category.findFirst({
                where: { name: subcategory }
            });

            // Step 5.2: If subcategory doesn't exist, create it
            if (!subcategoryData) {
                subcategoryData = await prisma.category.create({
                    data: {
                        name: subcategory,
                        parent_category_id: categoryData.category_id  // Link subcategory to parent category
                    }
                });
            } else {
                // Step 5.3: If subcategory exists, ensure it's linked to the parent category
                await prisma.category.update({
                    where: { category_id: subcategoryData.category_id },
                    data: { parent_category_id: categoryData.category_id }
                });
            }
        }
        return test;
    } catch (error) {
        throw new Error('Failed to create test');
    }
}



export async function selectAllQuestion(data: any) {

}

export async function selectQuestionById(data: any) {

}

export async function changeQuestion(data: any) {

}

export async function removeQuestion(data: any) {

}