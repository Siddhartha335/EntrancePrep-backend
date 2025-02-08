import { Router } from "express";
import userRoutes from "./userRoutes.js";
import questionRoutes from "./questionRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import testRoutes from "./testRoutes.js";
import subCategoryRoutes from "./subCategoryRoute.js";
import userTestRoutes from "./userTestRoutes.js"
import userAnswerRoutes from "./userAnswerRoutes.js"
import userRecommendations from "./recommendationRoutes.js"

const router = Router();

router.use("/user",userRoutes)
router.use("/questions",questionRoutes)
router.use("/category",categoryRoutes)
router.use("/tests",testRoutes)
router.use("/subcategory",subCategoryRoutes)
router.use("/user_tests",userTestRoutes)
router.use("/user_answers",userAnswerRoutes)
router.use("/recommendations",userRecommendations)

export default router;