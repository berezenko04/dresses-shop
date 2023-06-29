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
    iat: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
