import express from 'express'
import { createReview, getReviews, likeReview, dislikeReview } from "../controllers/ReviewsController.js";

//validations
import { commentValidation } from "../validations.js";
import validationErrors from "../utils/validationErrors.js";
import checkAuth from '../utils/checkAuth.js'

const router = express.Router();

router.get('/get/:id', getReviews);
router.post('/post/:id', commentValidation, validationErrors, checkAuth, createReview);
router.post('/like/:id', checkAuth, likeReview);
router.post('/dislike/:id', checkAuth, dislikeReview);

export default router;