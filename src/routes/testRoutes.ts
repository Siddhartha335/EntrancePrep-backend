import { RequestHandler, Router } from "express";
import { testValidator, validateTestDetails } from "../api/tests/validators/testValidator.js";
import { createTest, getAllTests, getTestById, updateTest, deleteTest } from "../controllers/testController.js";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/create", testValidator, validateTestDetails as RequestHandler, protectedRoutes as RequestHandler, isAdmin as RequestHandler, createTest);
router.get("/", getAllTests);
router.get("/:testId", getTestById);
router.put("/:testId", updateTest);
router.delete("/:testId", deleteTest);

export default router;