import { RequestHandler, Router } from "express";
import { registerUser } from "../controllers/userController.js";
import { registerValidator, validateUserDetails } from "../api/user/validators/userValidator.js";

const router = Router();

router.post("/register", registerValidator, validateUserDetails as RequestHandler, registerUser)

export default router;