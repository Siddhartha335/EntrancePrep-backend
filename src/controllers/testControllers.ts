import { Request,Response } from "express";
import { changeTest, removeTest, selectAllTest, testCreate } from "../api/test/services/testService.js";

export async function createTest(req:Request,res:Response) {

    const data = req.body;
   try {
    const test = await testCreate(data);
    res.status(201).json({status:"true",message:"Test created successfully",test:test});
   }
   catch(err:any) {
    res.status(400).json({status:"false",message:err.message});
   }
}

export async function getAllTest(req:Request,res:Response) {

    try {
        const allTest = await selectAllTest();
        res.status(200).json({status:"true",message:"All test fetched successfully",test:allTest});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function getTestById(req:Request,res:Response) {
   
}

export async function updateTest(req:Request,res:Response) {
   
    const {test_id} = req.params;
    const data = req.body;
    try {
        const test = await changeTest(Number.parseInt(test_id),data);
        res.status(200).json({status:"true",message:"Test updated successfully",test:test});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function deleteTest(req:Request,res:Response) {

    const {test_id} = req.params;
    try {
        const test = await removeTest(Number.parseInt(test_id));
        res.status(200).json({status:"true",message:"Test deleted successfully",test:test});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
   
}