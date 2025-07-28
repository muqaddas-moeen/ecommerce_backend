const User = require("../models/user.model");
const Product = require("../models/product.model");
const { constants } = require("../config/constants");

class UserController {
  // Get all users
  static async getUsers(req, res, next) {
    try {
      const users = await User.find();
      res.status(constants.SUCCESS).json({
        success: true,
        users: users,
      });
    } catch (err) {
      res.status(constants.SERVER_ERROR);
      next(err);
    }
  }

  // Get user detail
  static async getUser(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(constants.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      const products = await Product.find({ createdBy: user._id });

      res.status(constants.SUCCESS).json({
        success: true,
        user,
        products,
      });
    } catch (err) {
      next(err);
    }
  }

  // Get single user profile
  static async getUserProfile(req, res, next) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(constants.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(constants.SUCCESS).json({
        success: true,
        user: user,
      });
    } catch (err) {
      next(err);
    }
  }

  // Create user
  static async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      res.status(constants.CREATED).json({
        success: true,
        user: user,
      });
    } catch (error) {
      console.log("errrorrr : ", error);
      res.status(constants.VALIDATION_ERROR);
      next(error);
    }
  }

  // Update user
  static async updateUser(req, res, next) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
      });
      if (!updatedUser) {
        res.status(constants.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(constants.SUCCESS).json({
        success: true,
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  }

  // Delete user
  static async deleteUser(req, res, next) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(constants.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      res
        .status(constants.SUCCESS)
        .json({ success: true, message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
