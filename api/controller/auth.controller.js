import User from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../untils/createError.js";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
export const register = async (req, res, next) => {
  const { email, username } = req.body;
  const user = await User.findOne({ email });
  if (user) return next(createError(400, "Email is used"));
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, "Password or username is not correct!"));
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Password or username is not correct!"));
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(400, "Email is not exist"));
    const resetToken = randomstring.generate(10);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 456,
      auth: {
        user: "YOUR-GMAIL-USERNAME@gmail.com",
        pass: "YOUR-GENERATED-APP-PASSWORD",
      },
    });
    const mailOptions = {
      from: "FIVER",
      to: req.body.email,
      subject: "Reset Password",
      text: "Click the link below to reset your password: " + resetToken,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return next(err);
      res.send("Email sent");
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  return res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
