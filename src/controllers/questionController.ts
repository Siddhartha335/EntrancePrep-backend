import { Request,Response } from "express";
import { questionCreate, selectAllQuestion } from "../api/questions/services/questionService.js";

export async function createQuestion(req:Request,res:Response) {
   const data = req.body; 
   try {
        const newTest = await questionCreate(data);
        res.status(201).json({status:"true",message:"Question created successfully",test:newTest});
   }
   catch(err:any) {
       res.status(400).json({status:"false",message:err.message});
   }
}



export async function getAllQuestions(req:Request,res:Response) {
    const {category} = req.query;
    console.log(category)
    try {
        const questions = await selectAllQuestion(category);
        res.status(200).json({status:"true",questions:questions});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}

export async function getQuestionById(req:Request,res:Response) {
   
}

export async function updateQuestion(req:Request,res:Response) {
   
}

export async function deleteQuestion(req:Request,res:Response) {
   
}