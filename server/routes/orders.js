import express from "express";

//controllers
import * as OrdersController from "../controllers/OrdersController.js";

//validations
import checkAuth from "../utils/checkAuth.js";

const router = express.Router();

router.post("/make-order", checkAuth, OrdersController.makeOrder);
router.get("/get", checkAuth, OrdersController.getOrders);
router.get("/exportCSV", checkAuth, OrdersController.exportCSV);

export default router;
