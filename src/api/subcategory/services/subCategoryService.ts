import prisma from "../../../utils/db.js";

export async function subCategoryCreate(data: any) {

    let {name,isActive,category} = data;

    category = Number.parseInt(category);
    console.log(category)

    const subCategory = await prisma.category.create({
        data: {
            name,
            isActive,
            parent_category_id: category
        }
    });

    if(!subCategory) {
        throw new Error("Subcategory not created");
    }
    return subCategory;

}

export async function selectAllSubCategory() {

    const allSubCategory = await prisma.category.findMany({
        where: {
            parent_category_id: {
                not: null
            }
        }
    });

    if(!allSubCategory) {
        throw new Error("No subcategory found");
    }
    return allSubCategory;


}

export async function selectSubCategoryById(data: any) {

}

export async function changeSubCategory(category_id:number,data: any) {

    const category = await prisma.category.findUnique({
        where: {
            category_id: category_id
        }
    })

    if(!category) {
        throw new Error("Category not found");
    }

    const subCategory = await prisma.category.update({
        where: {
            category_id:category_id
        },
        data: {
            isActive: data.isActive,
            name: data.name,
            parent_category_id: data.parent_category_id
        }
    });

    return subCategory;

}

export async function removeSubCategory(category_id:number) {

    const subCategory = await prisma.category.delete({
        where: {
            category_id: category_id
        }
    });

    if(!subCategory) {
        throw new Error("Subcategory couldn't be deleted");
    }

    return subCategory;

}