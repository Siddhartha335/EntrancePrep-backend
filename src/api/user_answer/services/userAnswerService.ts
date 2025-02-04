import prisma from "../../../utils/db.js";

export async function userAnswerCreate(data: any) {

    const {user_test_id, questionId, selectedAnswer, isCorrect, user_id} = data;

    const userAnswer = await prisma.user_Answer.create({
        data: {
            user_test_id,
            question_id: questionId,
            selected_answer: selectedAnswer,
            is_correct: isCorrect,
            user_id
        }
    });

    if(!userAnswer) {
        throw new Error("User answer not created")
    }

    return userAnswer;
}

export async function selectAllUserAnswer(user_id:string,user_test_id:number) {
    const userAnswer = await prisma.user_Answer.findMany({
        where: {
            user_id: user_id,
            user_test_id: user_test_id
        }
    })

    if(!userAnswer) {
        throw new Error("User answer not found")
    }

    return userAnswer

}

export async function selectUserAnswerById(data: any) {

}

export async function changeUserAnswer(user_answer_id:number,data: any) {

   const { selectedAnswer, isCorrect } = data;

   const updateUserAnswer = await prisma.user_Answer.update({
    where:{
        user_answer_id
    },
    data:{
        selected_answer: selectedAnswer,
        is_correct: isCorrect
    }
   });

   if(!updateUserAnswer) {
    throw new Error("User answer not updated")
   }

   return updateUserAnswer
}

export async function removeUserAnswer(category_id:number) {

}