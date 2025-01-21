import { RequestHandler, Router } from "express";
import { testValidator, validateTestDetails } from "../api/questions/validators/questionValidator.ts.js";
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from "../controllers/questionController.js";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createTest);
router.get("/", getAllTests);
router.get("/:testId", getTestById);
router.put("/:testId", updateTest);
router.delete("/:testId", deleteTest);

export default router;