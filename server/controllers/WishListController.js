import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import WishListModel from "../models/wishList.js";
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

    const wishList = await WishListModel.find({ user: userId }).populate("product");
    const products = wishList.map((item) => item.product);

    res.status(200).json(products);
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

    const wishListItem = new WishListModel({
      product: itemId,
      user: userId,
    });

    await wishListItem.save();

    res.status(200).json(product);
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

    await WishListModel.findOneAndDelete({ product: itemId, user: userId });

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
