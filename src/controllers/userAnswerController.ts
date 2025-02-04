import { Request,Response } from "express";
import { userAnswerCreate,changeUserAnswer, selectAllUserAnswer } from "../api/user_answer/services/userAnswerService.js";

export async function createUserAnswer(req:Request,res:Response) {

    const data = req.body;
    try {
        const userAnswer = await userAnswerCreate(data);
        res.status(201).json({status:"true",message:"User answer added successfully",userAnswer:userAnswer});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }

}

export async function getAllUserAnswer(req:Request,res:Response) {

    const {user_id,user_test_id} = req.params;
    try {
        const userAnswer = await selectAllUserAnswer(user_id,parseInt(user_test_id));
        res.status(200).json({status:"true",message:"All user answers fetched successfully",userAnswer:userAnswer});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function getUserAnswerById(req:Request,res:Response) {
   
}

export async function updateUserAnswer(req:Request,res:Response) {

    const {user_answer_id} = req.params;
    const data = req.body;
    try {
        const updatedUserAnswer = await changeUserAnswer(Number.parseInt(user_answer_id),data);
        res.status(200).json({status:"true",message:"User answer updated successfully",userAnswer:updatedUserAnswer});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}

export async function deleteUserAnswer(req:Request,res:Response) {
   
}