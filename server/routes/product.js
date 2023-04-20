import express from "express";

//controllers
import { getProduct, getProducts } from '../controllers/ProductsController.js'
import { createComment, getComments } from "../controllers/CommentController.js";

//validations
import { commentValidation } from "../validations.js";
import validationErrors from "../utils/validationErrors.js";

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

router.get('/products/:id/comments', getComments);
router.post('/products/:id/comments', commentValidation, validationErrors, createComment);

export default router;

