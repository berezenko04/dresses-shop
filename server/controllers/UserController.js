import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import sharp from "sharp";
import crypto from "crypto";
import fs from "fs";

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
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const comments = await CommentsModel.find({ user: user }).skip(skip).limit(parseInt(limit));

    const commentsLength = await CommentsModel.find({ user: user }).countDocuments();

    res.json({ comments, length: commentsLength });
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
  try {
    const tempFilePath = req.file.path;
    const originalName = req.file.originalname;

    const hash = crypto
      .createHash("md5")
      .update(originalName + Date.now())
      .digest("hex");
    const destinationPath = `uploads/${hash}.webp`;

    await sharp(tempFilePath).resize(200, 200, { fit: "inside" }).toFile(destinationPath);

    fs.unlinkSync(tempFilePath);

    res.json({
      url: `http://localhost:3001/${destinationPath}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при загрузке и обработке изображения" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedData = req.body;
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.keys(updatedData).forEach((key) => {
      if (user[key] !== updatedData[key]) {
        user[key] = updatedData[key];
      }
    });

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
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
      html: `<div style="font-family:'Inter', sans-serif;">
        <div style="padding:24px;background-color:#F7F7F7;">
          <h1 style="font-weight: 500;font-size: 24px;line-height: 29px;text-transform:uppercase;color:#686868;">
            Sandrela
          </h1>
        </div>
        <div style="background-color:#FFFFFF;padding:24px;">
          <p style="font-size: 14px;line-height: 22px;color:#686868;width:100%;padding-bottom:16px;">
            Your reset password link for Sandrela is:
          </p>
          <a href="${link}" style="padding: 8px 16px;background-color:#ED7222;font-weight: 500;font-size: 16px;
          line-height: 24px;text-transform:uppercase;color:#FFFFFF;text-decoration:none;width:100%;">
            Reset Password
          </a>
          <p style="font-size: 14px;line-height: 22px;color:#686868;width:100%;padding-top:16px;">
           If it was not you, then we advise you to go in and change your password or write to 
           <a href="" style="color:#ED7222;text-decoration:underline">support</a>.
          </p>
        </div>
        <div style="padding:24px;background-color:#F7F7F7;">
          <p style="font-size: 14px;line-height: 22px;color:#686868;width:100%;padding-bottom:16px;">
            This email was sent to <span style="color:#ED7222;">${email}</span>. 
            If you’d rather not receive this kind of email, you can <a href="" style="color:#ED7222;text-decoration:underline;">unsubscribe</a> 
            or manage your email <a href="" style="color:#ED7222;text-decoration:underline;">preferences</a>.
          </p>
          <p style="font-size: 14px;line-height: 22px;color:#686868;width:100%;padding-bottom:48px;">
            © 2023 Sandrela, 100 Smith Street, Melbourne VIC 3000
          </p>
          <h1 style="font-weight: 500;font-size: 24px;line-height: 29px;text-transform:uppercase;color:#686868;">
            Sandrela
          </h1>
        </div>  
      </div>`,
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

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const userId = req.userId;
  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid current password" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.passwordHash = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password changed successfully" });
};
