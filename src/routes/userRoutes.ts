import { RequestHandler, Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { registerValidator, validateUserDetails } from "../api/user/validators/userValidator.js";

const router = Router();

router.post("/register", registerValidator, validateUserDetails as RequestHandler, registerUser as RequestHandler);

router.post("/login", loginUser as RequestHandler);

router.post("/logout", logoutUser)

export default router;