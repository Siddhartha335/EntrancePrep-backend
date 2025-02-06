import { RequestHandler, Router } from "express";
import { createQuestion,getAllQuestions,getQuestionById,updateQuestion,deleteQuestion, newQuestionBank, getAllTestQuestions } from "../controllers/questionController.js";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createQuestion);
router.get("/",protectedRoutes as RequestHandler, getAllQuestions);
router.get("/tests",protectedRoutes as RequestHandler, getAllTestQuestions);
router.post("/create-question-bank",protectedRoutes as RequestHandler, isAdmin as RequestHandler, newQuestionBank);
router.get("/:testId", getQuestionById);
router.put("/:testId", updateQuestion);
router.delete("/:testId", deleteQuestion);

export default router;