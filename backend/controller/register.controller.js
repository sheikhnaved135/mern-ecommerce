import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, question, address } = req.body;
    if (!username) {
      return res.status(400).send({
        message: "username is required",
        success: false,
      });
    }
    if (!email) {
      return res.status(400).send({
        message: "email is required",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).send({
        message: "password is required",
        success: false,
      });
    }
    if (!phone) {
      return res.status(400).send({
        message: "phone is required",
        success: false,
      });
    }
    if (!address) {
      return res.status(400).send({
        message: "address is required",
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: "user already exist, please login",
        success: false,
      });
    }

    const currPassword = await hashPassword(password);
    const createdUser = await new userModel({
      username,
      email,
      password: currPassword,
      address,
      question,
      phone,
    }).save();
    const user = await userModel.findById(createdUser._id).select("-password");
    res.status(201).send({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in register controller",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        message: "email is required",
        success: false,
      });
    }
    if (!password) {
      return res.status(400).send({
        message: "password is required",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "Email not registered",
        success: false,
      });
    }
    const checkPass = await comparePassword(password, user.password);
    if (!checkPass) {
      return res.status(200).send({
        message: "Password is incorrect",
        success: false,
      });
    }
    const token = await jwt.sign({ _id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      message: "user logged in successfully",
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "something went wrong in login controller",
      success: false,
    });
  }
};

export const testController = async (req, res) => {
  return res.status(200).send({
    message: "entered protected routes",
  });
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, password } = req.body;
    const user = await userModel.findOne({ email, question });
    if (!user) {
      return res.status(201).send({
        message: "wrong email or answer",
        success: false,
      });
    }
    const hashedP = await hashPassword(password);
    await userModel.findByIdAndUpdate(user._id, { password: hashedP });
    res.status(200).send({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in forgot password controller", error);
  }
};
