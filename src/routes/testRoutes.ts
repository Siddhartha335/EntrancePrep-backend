import { RequestHandler, Router } from "express";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";
import { createTest,getAllTest,getTestById,updateTest,deleteTest } from "../controllers/testControllers.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createTest);
router.get("/",protectedRoutes as RequestHandler, isAdmin as RequestHandler, getAllTest);
router.get("/:test_id", getTestById);
router.put("/:test_id",protectedRoutes as RequestHandler, isAdmin as RequestHandler, updateTest);
router.delete("/:test_id",protectedRoutes as RequestHandler, isAdmin as RequestHandler, deleteTest);

export default router;