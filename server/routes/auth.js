import express from 'express'

//validation
import { authValidation } from '../validations/auth.js'

//utils
import { checkAuth, validationErrors } from '../utils/index.js';

//controllers
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', authValidation, validationErrors, UserController.login);

router.post('/register', authValidation, validationErrors, UserController.register);

router.get('/me', checkAuth, UserController.getMe);

export default router;