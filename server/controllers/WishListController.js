import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import WishListModel from "../models/wishList.js";

export const getWishList = async (req, res) => {
  try {
    const { limit = 9, page = 1 } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(400).json({
        message: "User is not found",
      });
    }

    const wishList = await WishListModel.find({ user: userId })
      .populate("product")
      .skip(skip)
      .limit(limit);
    const products = wishList.map((item) => item.product);
    const wishListLength = await WishListModel.find({ user: user }).countDocuments();

    res.status(200).json({ products, length: wishListLength });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addToWishList = async (req, res) => {
  try {
    const { itemId } = req.query;
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
    const userId = req.userId;

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
