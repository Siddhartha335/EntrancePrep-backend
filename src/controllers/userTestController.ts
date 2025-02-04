import { Request,Response } from "express";
import { changeUserTest, userTestCreate } from "../api/user_taking_test/services/userTestServivce.js";

export async function createUserTest(req:Request,res:Response) {

    const data = req.body;
    try {
        const userTest = await userTestCreate(data);
        res.status(201).json({status:"true",message:"Test has been started",test:userTest});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }

}

export async function getAllUserTest(req:Request,res:Response) {
}

export async function getUserTestById(req:Request,res:Response) {
   
}

export async function updateUserTest(req:Request,res:Response) {

    const {user_test_id} = req.params;
    const data = req.body;
    try {
        const updatedUserTest = await changeUserTest(Number.parseInt(user_test_id),data);
        res.status(200).json({status:"true",message:"User test finished",userTest:updatedUserTest});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}

export async function deleteUserTest(req:Request,res:Response) {
   
}