import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  likes: {
    type: Array,
    items: {
      type: String,
    }
  },
  dislikes: {
    type: Array,
    items: {
      type: String,
    }
  },
  rating: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comment", CommentSchema);
