import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

//routes
import AuthRoutes from "./routes/auth.js";
import APIProductsRoutes from "./routes/product.js";
import WishListRoutes from "./routes/wishlist.js";
import CartRoutes from "./routes/cart.js";
import UserRoutes from "./routes/user.js";

const PORT = process.env.PORT || 3001;
const db =
  "mongodb+srv://luxurypluxury:28082004r@wedding.fwhc0ye.mongodb.net/wedding?retryWrites=true&w=majority";

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

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port localhost:${PORT}...`);
});
