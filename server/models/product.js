import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    stock: {
      type: Boolean,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      items: {
        type: String,
      },
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: Array,
      items: {
        type: String,
      },
      required: true,
    },
    colors: {
      type: Array,
      items: {
        type: String,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.virtual("discountedPrice").get(function () {
  return this.price * (1 - this.discount);
});

export default mongoose.model("Product", ProductSchema);
