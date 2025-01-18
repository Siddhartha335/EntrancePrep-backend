import { body,validationResult } from "express-validator";
import { Request,Response,NextFunction } from "express";

export const testValidator = [
    body("test_name").isLength({min:3}).withMessage("Test name must be atleast 3 characters long"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
    body("category_id").isNumeric().withMessage("Category ID must be a number"),
];

export const validateTestDetails = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({errors: errors.array()});
}