const Category = require("../models/category.model");
const { constants } = require("../config/constants");

class CategoryController {
  // Create category
  static async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const existing = await Category.findOne({ name });
      if (existing) {
        return res.status(constants.VALIDATION_ERROR).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category = await Category.create({ name });
      res.status(constants.CREATED).json({
        success: true,
        category: category,
      });
    } catch (error) {
      console.log("Create Category Error:", error);
      res.status(constants.VALIDATION_ERROR);
      next(error);
    }
  }

  // Get all categories
  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(constants.SUCCESS).json({
        success: true,
        categories: categories,
      });
    } catch (error) {
      console.log("Get All Categories Error:", error);

      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get category by ID
  static async getCategoryById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }

      res.status(constants.SUCCESS).json({
        success: true,
        category: category,
      });
    } catch (error) {
      console.log("Get Category Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Update category
  static async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return res
          .status(constants.NOT_FOUND)
          .json({ success: false, message: "Category not found" });
      }

      res.status(constants.success).json({
        success: true,
        category: updatedCategory,
      });
    } catch (error) {
      console.log("Update Category Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Delete category
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Category.findByIdAndDelete(id);

      if (!deleted) {
        return res
          .status(constants.NOT_FOUND)
          .json({ success: false, message: "Category not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      console.log("Delete Category Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }
}

module.exports = CategoryController;
