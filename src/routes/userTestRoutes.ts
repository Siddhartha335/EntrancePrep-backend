import { RequestHandler, Router } from "express";
import {  protectedRoutes } from "../middlewares/authMiddleware.js";
import { createUserTest, updateUserTest } from "../controllers/userTestController.js";

const router = Router();

router.post("/create",protectedRoutes as RequestHandler, createUserTest);
router.put("/:user_test_id",protectedRoutes as RequestHandler, updateUserTest);

export default router;