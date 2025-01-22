import prisma from "../../../utils/db.js";

export async function testCreate(data: any) {

    let {name,description,isActive,isAdaptive,hasNegativeMarking,duration,category_id,type} = data;
    category_id = Number.parseInt(category_id);
    duration = Number.parseInt(duration);

    const test = await prisma.test.create({
        data: {
            name,
            description,
            isActive,
            isAdaptive,
            hasNegativeMarking,
            duration,
            category_id,
            type: type
        }
    });

    if (!test) {
        throw new Error('Failed to create test');
    }
    return test;

}

export async function selectAllTest() {

    const tests = await prisma.test.findMany();
    if (!tests) {
        throw new Error('Failed to fetch tests');
    }
    return tests;

}

export async function selectTestById(data: any) {

}

export async function changeTest(data: any) {

}

export async function removeTest(data: any) {

}