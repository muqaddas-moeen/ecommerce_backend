const Product = require("../models/product.model");
const User = require("../models/user.model");
const { constants } = require("../config/constants");

class ProductController {
  // Create a new product
  static async addProduct(req, res, next) {
    try {
      const userId = req.user._id;

      const {
        title,
        description,
        price,
        stock,
        image,
        color,
        brand,
        size,
        isNew,
        categoryId,
      } = req.body;

      // Check if a product with same title exists
      const existingProductTitle = await Product.findOne({ title });

      if (existingProductTitle) {
        return res.status(constants.CONFLICT_ERROR).json({
          success: false,
          message: "Product already exists with this title.",
          product: existingProductTitle,
        });
      }

      // Check if a product with same description exists
      const existingProductDescription = await Product.findOne({ description });

      if (existingProductDescription) {
        return res.status(constants.CONFLICT_ERROR).json({
          success: false,
          message: "Product already exists with this description.",
          product: existingProductDescription,
        });
      }

      const product = new Product({
        title,
        description,
        price,
        stock,
        image,
        color,
        brand,
        size,
        isNew,
        categoryId,
        createdBy: userId,
      });

      const savedProduct = await product.save();

      return res.status(constants.CREATED).json({
        success: true,
        message: "Product created successfully",
        product: savedProduct,
      });
    } catch (error) {
      console.error("Add Product Error:", error);

      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get all products
  static async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();

      return res.status(constants.SUCCESS).json({
        success: true,
        products: products,
      });
    } catch (error) {
      console.error("Get All Products Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  static async getAllProductsOfUser(req, res, next) {
    try {
      const userId = req.user._id;

      const products = await Product.find({ createdBy: userId });

      return res.status(constants.SUCCESS).json({
        success: true,
        products: products,
      });
    } catch (error) {
      console.error("Get All Products Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  static async getAllProductsByCategory(req, res, next) {
    try {
      const categoryId = req.params.id;
      const products = await Product.find({ categoryId });

      return res.status(constants.SUCCESS).json({
        success: true,
        products: products,
      });
    } catch (error) {
      console.error("Get All Products Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get a single product by ID
  static async getProductById(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findById(id).populate(
        "createdBy",
        "name email"
      );

      if (!product) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(constants.SUCCESS).json({
        success: true,
        product: product,
      });
    } catch (error) {
      console.error("Get Product By ID Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Update a product by ID
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(constants.SUCCESS).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Update Product Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Delete a product by ID
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const deletedProduct = await Product.findByIdAndDelete(id);

      if (!deletedProduct) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(constants.SUCCESS).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Delete Product Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }
}

module.exports = ProductController;
