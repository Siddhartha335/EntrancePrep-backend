import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/db.js';

const protectedRoutes = async(req:Request,res:Response,next:NextFunction) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({status:"false",message:"Unauthorized access"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as jwt.JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                user_id: decoded.userId
            },
            select:{
                email:true,
                isAdmin:true,
            }
        })
        if(!user) {
            return res.status(401).json({status:"false",message:"Unauthorized access"});
        }
        (req as any).user = {
            email: user.email,
            isAdmin: user.isAdmin,
            userId: decoded.userId
        };
        next();
    }
    catch(err:any) {
        return res.status(401).json({status:"false",message:"Unauthorized access"});
    }
}

const isAdmin = async(req:Request,res:Response,next:NextFunction) => {
    if((req as any).user && (req as any).user.isAdmin) {
        next();
    } else {
        return res.status(403).json({status:"false",message:"Forbidden for general users, Contact admin"});
    }
}

export { protectedRoutes,isAdmin };