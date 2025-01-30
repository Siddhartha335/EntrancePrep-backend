import { RequestHandler, Router } from "express";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";
import { createCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createCategory);
router.get("/",protectedRoutes as RequestHandler, isAdmin as RequestHandler, getAllCategory);
router.get("/:category_id", getCategoryById);
router.put("/:category_id",protectedRoutes as RequestHandler, isAdmin as RequestHandler, updateCategory);
router.delete("/:category_id", protectedRoutes as RequestHandler, isAdmin as RequestHandler,deleteCategory);

export default router;