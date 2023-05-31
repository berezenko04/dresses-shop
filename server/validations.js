import { body } from "express-validator";

export const registerValidation = [
  body("name", "Invalid name")
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name is required"),
  body("lastName", "Invalid last name")
    .notEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage("Last name is required"),
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({ min: 8, max: 32 }),
];

export const authValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 8 characters").isLength({ min: 8 }),
];

export const commentValidation = [
  body("user").notEmpty().withMessage("User is required"),
  body("text", "Enter comment").isString(),
  body("rating").isInt({ min: 0, max: 5 }).withMessage("Rating must be between 1 and 5"),
];
