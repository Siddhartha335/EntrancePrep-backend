import { Request,Response } from "express";
import { categoryCreate,selectAllCategory } from "../api/category/services/categoryService.js";

export async function createCategory(req:Request,res:Response) {
    const data = req.body;
    try {
        const newCategory = await categoryCreate(data);
        res.status(201).json({status:"true",message:"Category created successfully",category:newCategory});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}

export async function getAllCategory(req:Request,res:Response) {
   try {
        const allCategory = await selectAllCategory();
        res.status(200).json({status:"true",message:"All category fetched successfully",category:allCategory});
   }
   catch(err:any) {
       res.status(400).json({status:"false",message:err.message});
   }
}

export async function getCategoryById(req:Request,res:Response) {
   
}

export async function updateCategory(req:Request,res:Response) {
   
}

export async function deleteCategory(req:Request,res:Response) {
   
}