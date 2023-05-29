import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import { extractUserIdFromToken } from "../utils/extractUserIdFromToken.js";

export const getCart = async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Authorization token not found",
      });
    }

    const userId = extractUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        message: "Invalid authorization token",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const cart = user.cart;

    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { userId, item } = req.body;

    if (!userId) {
      res.status(400).json({
        message: "User ID not found",
      });
    }

    if (!item) {
      return res.status(400).json({
        message: "Product not found",
      });
    }

    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(item._id);

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

    user.cart.push(item);
    await user.save();

    res.status(200).json({
      message: "Item added to cart",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId, size } = req.query;
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

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId || item.size !== size);

    await user.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
