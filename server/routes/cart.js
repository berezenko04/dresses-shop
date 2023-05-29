import express from "express";

//controllers
import * as CartController from "../controllers/CartController.js";

//validations
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, CartController.addToCart);
router.delete("/delete", checkAuth, CartController.removeFromCart); 
router.get("/get", checkAuth, CartController.getCart);

export default router;
