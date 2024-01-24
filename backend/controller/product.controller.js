import slugify from "slugify";
import productModel from "../models/product.model.js";
import fs from "fs";
import { AsyncResource } from "async_hooks";
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    switch (true) {
      case !name:
        return res.status(206).send({
          message: "name is required",
          success: false,
        });
        break;
      case !category:
        return res.status(206).send({
          message: "category is required",
          success: false,
        });
        break;
      case !description:
        return res.status(206).send({
          message: "description is required",
          success: false,
        });
        break;
      case !price:
        return res.status(206).send({
          message: "price is required",
          success: false,
        });
        break;
      case !quantity:
        return res.status(206).send({
          message: "quantity is required",
          success: false,
        });
        break;
      case !shipping:
        return res.status(206).send({
          message: "shipping is required",
          success: false,
        });
        break;
    }
    const { photo } = req.files;
    const product = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      message: "Product Created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in create product controller",
      success: false,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      message: "Got product successfully",
      success: true,
      product,
      countTotal: product.length,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in get product controller",
      success: false,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      message: "Product found Successfully",
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).send({
      message: "error in get single product controller",
      success: false,
    });
  }
};

export const getPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      // console.log(product.photo.data);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in get-photo controller",
      success: false,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      message: "product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "erro rin delete product controller",
      success: false,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;
    const product = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(200).send({
      message: "Product updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in update product controller",
      success: false,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    console.log(args);
    const product = await productModel.find(args);
    return res.status(200).send({
      message: "product filtered successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in product filter controller",
      success: false,
    });
  }
};

export const totalCountController = async (req, res) => {
  try {
    const totalCount = await productModel
      .find()
      .select("-photo")
      .estimatedDocumentCount();
    return res.status(200).send({
      message: "product found",
      success: true,
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in totalCountController",
      success: false,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;
    const product = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      message: "product list successfull",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in productListController",
      success: false,
      error,
    });
  }
};
