import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import CartModel from "../models/cart.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const cart = await CartModel.find({ user: userId }).populate("product");
    const products = cart.map((item) => item.product);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.query;
    const userId = req.userId;

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

    const cartItem = new CartModel({
      product: {
        id: product._id,
        title: product.title,
        price: product.price,
        discount: product.discount,
        imageUrl: product.images[0],
        size: size,
      },
      user: userId,
    });

    await cartItem.save();

    res.status(200).json(cartItem.product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId, size } = req.query;
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await CartModel.findOneAndDelete({
      "product.id": itemId,
      "product.size": size,
      user: userId,
    });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({
        message: "User is not found",
      });
    }

    try {
      await CartModel.deleteMany({ user: userId });
      return res.status(200).json({
        message: "Cart cleared successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to clear cart",
        error: error.message,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
