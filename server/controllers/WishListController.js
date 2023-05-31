import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken.js";

export const getWishList = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Authorization token not found",
      });
    }
    const userId = extractUserIdFromToken(token);
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(400).json({
        message: "User is not found",
      });
    }

    const wishList = user.wishList;

    res.status(200).json(wishList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToWishList = async (req, res) => {
  try {
    const { itemId } = req.query;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Authorization token not found",
      });
    }

    const userId = extractUserIdFromToken(token);

    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(itemId);

    if (!user) {
      res.status(400).json({
        message: "User is not found",
      });
    }
    if (!product) {
      res.status(400).json({
        message: "Product is not found",
      });
    }

    user.wishList.push(product);
    await user.save();

    res.status(200).json({
      message: "Item added to wishlist",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { itemId } = req.query;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Authorization token not found",
      });
    }

    const userId = extractUserIdFromToken(token);

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishList = user.wishList.filter((item) => item._id.toString() !== itemId);

    await user.save();

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
