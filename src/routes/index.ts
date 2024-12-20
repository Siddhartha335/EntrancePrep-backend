import { Router } from "express";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/user",userRoutes)

export default router;