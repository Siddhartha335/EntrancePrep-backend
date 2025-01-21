import { Request,Response } from "express";
import { testCreate } from "../api/questions/services/questionService.js";

export async function createTest(req:Request,res:Response) {
   const data = req.body; 
   try {
        const newTest = await testCreate(data);
        res.status(201).json({status:"true",message:"Question created successfully",test:newTest});
   }
   catch(err:any) {
       res.status(400).json({status:"false",message:err.message});
   }
}

export async function getAllTests(req:Request,res:Response) {
   
}

export async function getTestById(req:Request,res:Response) {
   
}

export async function updateTest(req:Request,res:Response) {
   
}

export async function deleteTest(req:Request,res:Response) {
   
}