import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(decode);
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(400).send({
        message: "You are not admin",
        success: false,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`error in auth middleware ${error}`);
  }
};

export const isUser = async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user.role !== 0) {
    return res.status(400).send({
      message: "not a user",
      success: false,
    });
  } else {
    next();
  }
};
