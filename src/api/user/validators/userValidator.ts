import { body,validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const registerValidator = [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long"),
];

export const validateUserDetails = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({errors: errors.array()});
}