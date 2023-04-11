import express from "express";
import { getProduct, getProducts } from '../controllers/ProductsController.js'

const router = express.Router();

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

export default router;

