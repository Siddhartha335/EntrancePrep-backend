import { Router } from "express";
import userRoutes from "./userRoutes.js";
import questionRoutes from "./questionRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import testRoutes from "./testRoutes.js";
import subCategoryRoutes from "./subCategoryRoute.js";

const router = Router();

router.use("/user",userRoutes)
router.use("/questions",questionRoutes)
router.use("/category",categoryRoutes)
router.use("/tests",testRoutes)
router.use("/subcategory",subCategoryRoutes)

export default router;