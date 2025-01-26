import { RequestHandler, Router } from "express";
import { isAdmin, protectedRoutes } from "../middlewares/authMiddleware.js";
import { createSubCategory, deleteSubCategory, getAllSubCategory, getSubCategoryById, updateSubCategory } from "../controllers/subCategoryController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, isAdmin as RequestHandler, createSubCategory);
router.get("/",protectedRoutes as RequestHandler, isAdmin as RequestHandler, getAllSubCategory);
router.get("/:category_id",protectedRoutes as RequestHandler, isAdmin as RequestHandler, getSubCategoryById);
router.put("/:category_id",protectedRoutes as RequestHandler, isAdmin as RequestHandler, updateSubCategory);
router.delete("/:category_id", deleteSubCategory);

export default router;