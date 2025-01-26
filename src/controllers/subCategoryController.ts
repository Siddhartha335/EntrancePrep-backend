import { Request,Response } from "express";
import { subCategoryCreate,selectAllSubCategory, changeSubCategory, removeSubCategory } from "../api/subcategory/services/subCategoryService.js";

export async function createSubCategory(req:Request,res:Response) {

    const data = req.body;

    try {
        const subCategory = await subCategoryCreate(data);
        res.status(201).json({status:"true",message:"Subcategory created successfully",subCategory:subCategory});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }

}

export async function getAllSubCategory(req:Request,res:Response) {

    try {
        const allSubCategory = await selectAllSubCategory();
        res.status(200).json({status:"true",message:"All subcategory fetched successfully",subCategory:allSubCategory});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function getSubCategoryById(req:Request,res:Response) {
}

export async function updateSubCategory(req:Request,res:Response) {

    const {category_id} = req.params;

    try {
        const subCategory = await changeSubCategory(Number.parseInt(category_id),req.body);
        res.status(200).json({status:"true",message:"Subcategory updated successfully",subCategory:subCategory});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }

   
}

export async function deleteSubCategory(req:Request,res:Response) {

    const {category_id} = req.params;
    try {
        const subCategory = await removeSubCategory(Number.parseInt(category_id));
        res.status(200).json({status:"true",message:"Subcategory deleted successfully",subCategory:subCategory});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}