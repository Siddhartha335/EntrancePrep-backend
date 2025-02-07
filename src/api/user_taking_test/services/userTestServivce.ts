import prisma from "../../../utils/db.js";

export async function userTestCreate(data: any) {
    const { user_id, test_id, start_time} = data;

    const userTest = await prisma.user_Test.create({
        data:{
            user_id,
            test_id,
            start_time:start_time ? new Date(start_time) : new Date(),
        }
    })

    if(!userTest) {
        throw new Error('Failed to start test');
    }

    return userTest

}

export async function selectAllUserTest() {

}

export async function selectUserTestById(user_id:string) {

    const getUserTest = await prisma.user_Test.findMany({
        where:{
            user_id: user_id
        },
        include:{
            test: true
        }
    })

    if(!getUserTest) {
        throw new Error('User hadnt taken any test');
    }

    return getUserTest

}

export async function changeUserTest(user_test_id:number,data: any) {

    const { end_time, score, status } = data;

    const updatedUserTest = await prisma.user_Test.update({
        where: {
            user_test_id: user_test_id
        },
        data:{
            end_time:end_time ? new Date(end_time) : new Date(),
            score,
            status
        }
    });

    if(!updatedUserTest) {
        throw new Error('Failed to analyze your test');
    }

    return updatedUserTest;

}

export async function removeUserTest(category_id:number) {

}