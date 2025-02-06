import { Request,Response } from "express";
import { createQuestionBank, questionCreate, selectAllQuestion, selectAllTestQuestion } from "../api/questions/services/questionService.js";

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
    try {
        const questions = await selectAllQuestion(category);
        res.status(200).json({status:"true",questions:questions});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}
export async function getAllTestQuestions(req:Request,res:Response) {
    const {test_id} = req.query;
    try {
        const questions = await selectAllTestQuestion(test_id);
        res.status(200).json({status:"true",questions:questions});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}


export async function getQuestionById(req:Request,res:Response) {
   
}

export async function newQuestionBank(req:Request,res:Response) {

    const data = req.body;
    try {
        const questionBank = await createQuestionBank(data);
        res.status(201).json({status:"true",message:"Questionbank created succesfully!",questionBank:questionBank})
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}


export async function updateQuestion(req:Request,res:Response) {
   
}

export async function deleteQuestion(req:Request,res:Response) {
   
}