import express from 'express'

//controllers
import * as UserController from '../controllers/UserController.js';

//validations
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.post('/add', checkAuth, UserController.addToWishList);

router.delete('/delete', checkAuth, UserController.removeFromWishlist);

export default router;