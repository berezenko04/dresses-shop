import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

//routes
import AuthRoutes from "./routes/auth.js";
import APIProductsRoutes from "./routes/product.js";
import WishListRoutes from "./routes/wishlist.js";
import CartRoutes from "./routes/cart.js";
import UserRoutes from "./routes/user.js";
import ForgotPasswordRoutes from "./routes/forgotPassword.js";
import OrderRoutes from "./routes/orders.js";
import ReviewsRoutes from "./routes/reviews.js";
import SearchRoutes from "./routes/search.js";

dotenv.config();

const PORT = process.env.PORT;
const db = `${process.env.DB}`;

mongoose
  .connect(db)
  .then(() => console.log("DB is started!"))
  .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/auth", AuthRoutes);
app.use("/user", UserRoutes);
app.use("/api", APIProductsRoutes);
app.use("/wishlist", WishListRoutes);
app.use("/cart", CartRoutes);
app.use("/orders", OrderRoutes);
app.use("/reviews", ReviewsRoutes);
app.use("/search", SearchRoutes);
app.use("", ForgotPasswordRoutes);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port localhost:${PORT}...`);
});
