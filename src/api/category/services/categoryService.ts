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
        console.log(error);
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

export async function changeCategory(category_id:number,data: any) {

    const category = await prisma.category.findUnique({
        where: {
            category_id
        }
    });

    if(!category) {
        throw new Error('Category not found');
    }

    const newCategory = await prisma.category.update({
        where: {
            category_id
        },
        data: {
            ...data
        }
    });

    if(!newCategory) {
        throw new Error('Failed to update category');
    }

    return newCategory;
}

export async function removeCategory(category_id:number) {
    const category = await prisma.category.findUnique({
        where: {
            category_id
        }
    });

    if(!category) {
        throw new Error('Category not found');
    }

    const deletedCategory = await prisma.category.delete({
        where: {
            category_id
        }
    });

    if(!deletedCategory) {
        throw new Error('Failed to delete category');
    }

    return deletedCategory;
}