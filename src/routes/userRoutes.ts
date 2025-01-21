import { RequestHandler, Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { registerValidator, validateUserDetails } from "../api/user/validators/userValidator.js";
import passport from "passport";
import { generateToken } from "../api/user/utils/jwtUtils.js";
import "../api/user/strategies/googleStrategy.js";

const router = Router();

router.post("/register", registerValidator, validateUserDetails as RequestHandler, registerUser as RequestHandler);

router.post("/login", loginUser as RequestHandler);

router.post("/logout", logoutUser)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/redirect", passport.authenticate("google", { failureRedirect: "/login", session: false }), (req: any, res: any) => {
  const user = req.user;
  if (user) {
    generateToken(res, user.id);
    user.password = undefined as any;
    // res.status(200).json(user);
    const frontend_url = `${process.env.FRONTEND_URL}/login/success?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(frontend_url)
  } else {
    return res.status(400).json({ status: false, message: "Invalid credentials" });
  }
});

export default router;