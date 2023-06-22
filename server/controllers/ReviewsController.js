import CommentModel from "../models/comment.js";
import ProductModel from "../models/product.js";
import UserModel from '../models/user.js'

export const createReview = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const comment = new CommentModel({
      product: product._id,
      user: req.body.user,
      text: req.body.text,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      rating: req.body.rating,
      date: req.body.date,
    });

    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occurred while adding a comment",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const comments = await CommentModel.find({ product: id });
    const commentsLength = comments.length;
    res.status(200).json({
      comments,
      length: commentsLength,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to receive product",
    });
  }
};

export const likeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      res.status(400).json({
        message: "User is not found",
      });
    }

    const comment = await CommentModel.findById(id);
    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    const userLikedIndex = comment.likes.indexOf(userId);
    if (userLikedIndex > -1) {
      comment.likes.splice(userLikedIndex, 1);
    } else {
      comment.likes.push(userId);
    }

    const userDislikedIndex = comment.dislikes.indexOf(userId);
    if (userDislikedIndex > -1) {
      comment.dislikes.splice(userDislikedIndex, 1);
    }

    await comment.save();
    res.send(userId);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to receive product",
    });
  }
};

export const dislikeReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).send({ error: "Comment not found" });
    }

    const userDislikedIndex = comment.dislikes.indexOf(userId);

    if (userDislikedIndex > -1) {
      comment.dislikes.splice(userDislikedIndex, 1);
    } else {
      const userLikedIndex = comment.likes.indexOf(userId);

      if (userLikedIndex > -1) {
        comment.likes.splice(userLikedIndex, 1);
      }

      comment.dislikes.push(userId);
    }

    await comment.save();

    res.send(userId);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
};
