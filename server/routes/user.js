import express from "express";
import multer from "multer";

//utils
import { checkAuth } from "../utils/index.js";

//controllers
import * as UserController from "../controllers/UserController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/get", UserController.getUser);

router.get("/comments", checkAuth, UserController.getReviews);

router.post("/upload", upload.single("image"), checkAuth, UserController.uploadAvatar);

router.put("/:id", checkAuth, UserController.updateUser);

export default router;
