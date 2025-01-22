import prisma from "../../../utils/db.js";

export async function categoryCreate(category:string) {
    const categoryData = await prisma.category.create({
        data: { name: category }
    });
    return categoryData;
}

// export async function testCreate() {
//     const test = await prisma.test.create({
//         data: {
//             test_name: `${testType} Entrance Test`,
//             test_description: `${testType} Entrance Test`,
//             duration: 30,
//             category_id: categoryData.category_id,
//             type: testType,
//         }
//     });
//     return test;
// }