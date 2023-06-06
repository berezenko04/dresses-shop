import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  product: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Cart", CartSchema);
