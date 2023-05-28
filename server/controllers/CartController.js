import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";

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
    const { userId, itemId } = req.query;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter((item) => item._id.toString() !== itemId);

    await user.save();

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
