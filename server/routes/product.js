import express from "express";
import { getProduct, getProducts, getProductsCount } from '../controllers/ProductsController.js'

const router = express.Router();

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.get('/products/count', getProductsCount);

export default router;

