import { RequestHandler, Router } from "express";
import {  protectedRoutes } from "../middlewares/authMiddleware.js";
import { createRecommendation, getRecommendation } from "../controllers/recommendationController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler,createRecommendation as RequestHandler);
router.get("/:user_id",protectedRoutes as RequestHandler,getRecommendation);

export default router;