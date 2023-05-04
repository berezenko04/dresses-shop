import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//models
import UserModel from "../models/user.js";
import ProductModel from "../models/product.js"

export const register = async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User with this email already exists" });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to register",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: "User is not found",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );
        if (!isValidPass) {
            return res.status(401).json({
                message: "Password is incorrect",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secret123",
            {
                expiresIn: "30d",
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to auth",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "User is not found",
            });
        }

        const { passwordHash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Access denied",
        });
    }
};

export const addToWishList = async (req, res) => {
    try {
        const { userId, itemId } = req.query;

        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(itemId);

        if (!user) {
            res.status(400).json({
                message: 'User is not found'
            })
        }
        if (!product) {
            res.status(400).json({
                message: 'Product is not found'
            })
        }

        user.wishList.push(product);
        await user.save();

        res.status(200).json({
            message: 'Item added to wishlist'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const removeFromWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.query;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishList = user.wishList.filter(item => item._id.toString() !== itemId);

        await user.save();

        res.status(200).json({ message: 'Item removed from wishlist' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.query;

        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(itemId);

        if (!user) {
            res.status(400).json({
                message: 'User is not found'
            })
        }
        if (!product) {
            res.status(400).json({
                message: 'Product is not found'
            })
        }

        user.cart.push(product);
        await user.save();

        res.status(200).json({
            message: 'Item added to cart'
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
