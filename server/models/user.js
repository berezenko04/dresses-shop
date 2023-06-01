import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
      default: "/default-avatar.png",
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    sex: {
      type: String,
      default: "",
    },
    cart: {
      type: Array,
      items: {
        id: {
          type: Number,
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
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
