import prisma from "../../../utils/db.js";

export async function categoryCreate(data: any) {
   const {name,isActive} = data;
   try {
        const category = await prisma.category.create({
            data:{
                name,
                isActive,
            }
        })
        return category;
   }
    catch(error) {
        throw new Error('Failed to create category');
    }

}

export async function selectAllCategory() {
    const allCategory = await prisma.category.findMany({
        where: {
            parent_category_id: {
                equals: null
            }
        }
    });
    if(allCategory.length === 0) {
        throw new Error('No category found');
    }
    return allCategory;
}

export async function selectCategoryById(data: any) {

}

export async function changeCategory(data: any) {

}

export async function removeCategory(data: any) {

}