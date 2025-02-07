import { RequestHandler, Router } from "express";
import {  protectedRoutes } from "../middlewares/authMiddleware.js";
import { createUserTest, updateUserTest, getUserTestById } from "../controllers/userTestController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, createUserTest);
router.get("/:user_id",protectedRoutes as RequestHandler, getUserTestById);
router.put("/:user_test_id",protectedRoutes as RequestHandler, updateUserTest);

export default router;