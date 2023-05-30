import express from "express";

//controllers
import * as WishListController from "../controllers/WishListController.js";

//validations
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, WishListController.addToWishList);
router.delete("/delete", checkAuth, WishListController.removeFromWishlist);
router.get("/get", checkAuth, WishListController.getWishList);

export default router;
