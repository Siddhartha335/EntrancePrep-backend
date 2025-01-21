import { body,validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const testValidator = [
    body("test_type").isLength({min:3}).withMessage("Test type must be atleast 3 characters long"),
];

export const validateTestDetails = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({errors: errors.array()});
}