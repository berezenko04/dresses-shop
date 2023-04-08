import { body } from 'express-validator'

export const authValidation = [
    body('email', 'Invalid email format').isEmail().normalizeEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
]

// export const loginValidation = [
//     body('email', 'Invalid email format').isEmail().normalizeEmail(),
//     body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
// ]