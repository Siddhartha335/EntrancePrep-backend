import { RequestHandler, Router } from "express";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";
import { createTest,getAllTest,getTestById,updateTest,deleteTest } from "../controllers/testControllers.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createTest);
router.get("/",protectedRoutes as RequestHandler, isAdmin as RequestHandler, getAllTest);
router.get("/:categoryId", getTestById);
router.put("/:categoryId", updateTest);
router.delete("/:categoryId", deleteTest);

export default router;