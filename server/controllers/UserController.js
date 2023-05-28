import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

//models
import UserModel from "../models/user.js";
import CommentsModel from "../models/comment.js";

export const register = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      lastName: req.body.lastName,
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

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
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

export const getReviews = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const comments = await CommentsModel.find({ user: user });
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Access denied",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.query.userId);
    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }
    const { ...userData } = user._doc;
    res.status(200).json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to receive user",
    });
  }
};

export const uploadAvatar = async (req, res) => {
  res.json({
    url: `http://localhost:3001/uploads/${req.file.originalname}`,
  });
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (let key in updatedData) {
      if (updatedData.hasOwnProperty(key)) {
        if (user[key] !== updatedData[key]) {
          user[key] = updatedData[key];
        }
      }
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({
        message: "User is not found",
      });
    }
    const secret = "secret123" + oldUser.passwordHash;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
    const link = `http://localhost:5173/Sandrela/reset-password/${oldUser._id}/${token}/`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sandrelashop@gmail.com",
        pass: "djzidcxlsfhaliia",
      },
    });

    const mailOptions = {
      from: "sandrelashop@gmail.com",
      to: email,
      subject: "Reset Password",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ message: "Email sent" });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldUser = await UserModel.findOne({ _id: id });
  if (!oldUser) {
    return res.status(400).json({
      message: "User is not found",
    });
  }
  if (!password) {
    return res.status(404).json({
      message: "Password is required",
    });
  }
  const secret = "secret123" + oldUser.passwordHash;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await UserModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          passwordHash: encryptedPassword,
        },
      }
    );
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    res.status(404).json({ message: "Invalid token or id" });
  }
};
