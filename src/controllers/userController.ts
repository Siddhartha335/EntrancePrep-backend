import { Request,Response } from "express";
import { createUser,validateUserLogin } from "../api/user/services/userService.js";
import { generateToken } from "../api/user/utils/jwtUtils.js";

export async function registerUser(req:Request,res:Response) {
    try {
        const data = req.body;
        const user = await createUser(data);
        
        if(user) {
            user.isAdmin ? generateToken(res,user.user_id) : null;
            user.password = undefined as any;
            res.status(201).json(user);
        } else {
            return res.status(400).json({status:"false",message:"Invalid credentials"});
        }
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function loginUser(req:Request,res:Response) {
    try {
        const { email,password } = req.body;
        const user = await validateUserLogin(email,password);

        if(user.isActive === false) {
            return res.status(400).json({status:"false",message:"User account has been deactivated, contact admin"});
        }

        if(user) {
            generateToken(res,user.user_id);
            user.password = undefined as any;
            res.status(200).json(user);
        }
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}

export async function logoutUser(req:Request,res:Response) {
    try {
        res.cookie("token","",
            {httpOnly:true,expires:new Date(0)});
        res.status(200).json({status:"true",message:"User logged out successfully"});
    }
    catch(err:any) {
        res.status(400).json({status:"false",message:err.message});
    }
}