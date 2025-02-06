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
        // Step 2: Associate the test with the category
        const test = await prisma.test.findFirst({
            where: { 
                type: testType, 
            },
        })

        if (!test) {
            throw new Error('Test not found');
        }

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
                test_id: (test as any).test_id,
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


export async function selectAllQuestion(category:any) {
    if(category !== undefined) {
        category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()

        const allQuestions = await prisma.test_Question.findMany({
            include:{
                question: {
                    include: {
                        category: true
                    }
                },
                test: true
            },
            where: {
                question: {
                    category: {
                        name: category
                    }
                }
            },
            take:25
        });
    
        if(!allQuestions) {
            throw new Error('No questions found');
        }
    
        return allQuestions;
    }
    else {
        const allQuestions = await prisma.test_Question.findMany({
            include:{
                question: {
                    include: {
                        category: true
                    }
                },
                test: true
            }
        });
    
        if(!allQuestions) {
            throw new Error('No questions found');
        }
    
        return allQuestions;
    }
    

}

export async function createQuestionBank(data: any) {
    const { title, testType, description, duration, adaptive, negativeMarking, category, questions, scheduleType } = data;
  
    // Fetch categories from the database
    const categories = await prisma.category.findMany({
      where: { name: { in: category } },
    });
  
    if (categories.length !== category.length) {
      throw new Error("Some categories were not found.");
    }
  
    // Create the Test record
    const test = await prisma.test.create({
      data: {
        name: title,
        description: description,
        duration: parseInt(duration),
        isAdaptive: adaptive,
        hasNegativeMarking: negativeMarking,
        type: testType,
        category_id: categories[0]?.category_id, // Assigning a primary category
        is_question_bank:true
      },
    });
  
    // **Step 1: Create a single QuestionBank**
    const questionBank = await prisma.questionBank.create({
      data: {
        schedule_type: scheduleType.toUpperCase(),
        test_id: test.test_id,
      },
    });
  
    // **Step 2: Associate categories with the QuestionBank**
    const questionBankCategories = categories.map((categoryObj) => ({
      question_bank_id: questionBank.question_bank_id,
      category_id: categoryObj.category_id,
    }));
  
    for (const qbc of questionBankCategories) {
      await prisma.questionBankCategory.create({
        data: qbc,
      });
    }
  
    // **Step 3: Associate questions with the QuestionBank**
    const questionRecords = await prisma.question.findMany({
      where: { question_text: { in: questions } },
      select: { question_id: true },
    });
  
    if (questionRecords.length !== questions.length) {
      throw new Error("Some questions were not found.");
    }
  
    const questionBankQuestions = questionRecords.map((question) => ({
      question_bank_id: questionBank.question_bank_id,
      question_id: question.question_id,
    }));
  
    for (const qbq of questionBankQuestions) {
      await prisma.questionBankQuestion.create({
        data: qbq,
      });
    }
  
    return test;
  }
  

export async function selectQuestionById(data: any) {

}

export async function changeQuestion(data: any) {

}

export async function removeQuestion(data: any) {

}