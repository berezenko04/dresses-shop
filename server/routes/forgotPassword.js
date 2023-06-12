import express from "express";

//controllers
import * as UserController from "../controllers/UserController.js";
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/forgot-password", UserController.forgotPassword);
router.post("/reset-password/:id/:token", UserController.resetPassword);
router.post("/change-password", checkAuth, UserController.changePassword);

export default router;
