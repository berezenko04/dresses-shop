import express from "express";
import * as SearchController from "../controllers/SearchController.js";

const router = express.Router();

router.post("/get", SearchController.getSearchSuitable);

export default router;
