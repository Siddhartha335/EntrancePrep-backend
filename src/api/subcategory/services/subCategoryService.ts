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

export async function changeSubCategory(data: any) {

}

export async function removeSubCategory(data: any) {

}