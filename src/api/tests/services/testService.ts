import prisma from "../../../utils/db.js";

export async function testCreate(data: any) {
    const category = await prisma.category.findUnique({
        where: {
            category_id: data.category_id,
        },
    });

    if (!category) {
        throw new Error(`Category with category_id ${data.category_id} not found.`);
    }

    const newTest = await prisma.test.create({
        data: {
            test_name: data.test_name,
            test_description: data.test_description,
            duration: data.duration,
            is_full_length: data.is_full_length,
            is_adaptive: data.is_adaptive,
            category: {
                connect: {
                    category_id: data.category_id, // Use category_id to connect
                },
            },
        },
    });

    if (!newTest) {
        throw new Error("Test creation failed");
    }

    return newTest;
}


export async function selectAllTest(data: any) {

}

export async function selectTestById(data: any) {

}

export async function changeTest(data: any) {

}

export async function removeTest(data: any) {

}