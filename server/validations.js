import { body } from 'express-validator'

export const authValidation = [
    body('email', 'Invalid email format').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
]

export const commentValidation = [
    body('user').notEmpty().withMessage('User is required'),
    body('text', 'Enter comment').isLength({ min: 10 }).isString(),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

];