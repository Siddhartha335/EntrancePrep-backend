import { Request,Response,NextFunction } from "express";
import { Prisma } from "@prisma/client";

const routeNotFound = (req:Request,res:Response,next:NextFunction) : void => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404);
    next(error);
}

const errorHandler = (error:Error,req:Request,res:Response,next:NextFunction) : void => {
    let statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;

    if(error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Prisma Validation Error";
    }
    if(error instanceof Prisma.PrismaClientUnknownRequestError) {
        statusCode = 500;
        message = "Unknown error occurred with Prisma";
    }
    if(error.name === "ValidationError") {
        statusCode = 400;
    }
    if(error.name === "CastError") {
        statusCode = 404;
        message = "Resource Not Found";
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack
    })
}

export {routeNotFound,errorHandler};