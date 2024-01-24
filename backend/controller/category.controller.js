import slugify from "slugify";
import categoryModel from "../models/category.model.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const existingName = await categoryModel.findOne({ name });
    if (existingName) {
      return res.status(200).send({
        message: "Category Already Exist",
        success: false,
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    const cat = await categoryModel.findById(category._id);
    res.status(200).send({
      message: "Category created successfully",
      success: true,
      cat,
    });
  } catch (error) {
    res.status(400).send({
      message: "something wrong in category controller",
      success: false,
    });
    console.log(error);
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      message: "Category updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "error in update category controller",
      success: false,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      return res.status(204).send({
        message: "No category found",
        success: false,
        category,
      });
    }
    res.status(200).send({
      message: "All category founder",
      success: true,
      category,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in get all category controller",
      success: false,
    });
    console.log(error);
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      res.status(205).send({
        message: "Category did not exist",
        success: false,
      });
    }
    res.status(200).send({
      message: "Category found successfully",
      success: true,
      category,
    });
  } catch (error) {
    res.status(400).send({
      message: "Error in get  single category controller",
      success: false,
    });
    console.log(error);
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findByIdAndDelete(req.params.id, { new: true });
    res.status(200).send({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in delete category controller",
      success: false,
    });
  }
};
