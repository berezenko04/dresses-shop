import mongoose from "mongoose";

const WishListSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  } 
});

export default mongoose.model("WishList", WishListSchema);
