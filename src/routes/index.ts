import { Router } from "express";
import userRoutes from "./userRoutes.js";
import testRoutes from "./questionRoutes.js";

const router = Router();

router.use("/user",userRoutes)
router.use("/tests",testRoutes)

export default router;