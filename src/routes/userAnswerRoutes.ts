import { RequestHandler, Router } from "express";
import {  protectedRoutes } from "../middlewares/authMiddleware.js";
import { createUserAnswer, getAllUserAnswer, updateUserAnswer } from "../controllers/userAnswerController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler,createUserAnswer);
router.get("/:user_id/:user_test_id",protectedRoutes as RequestHandler,getAllUserAnswer);
router.put("/:user_answer_id",protectedRoutes as RequestHandler, updateUserAnswer);

export default router;