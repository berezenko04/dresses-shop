import express from "express";

//controllers
import { forgotPassword, resetPassword } from "../controllers/UserController.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
