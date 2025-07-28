const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { constants } = require("../config/constants");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(constants.CONFLICT_ERROR)
          .json({ success: false, message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      res.status(constants.CREATED).json({
        success: true,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(constants.UNAUTHORIZED)
          .json({ success: false, message: "Invalid credentials" });
      }

      const token = generateToken(user._id);

      res.status(constants.SUCCESS).json({
        success: true,
        user,
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }
}

module.exports = AuthController;
