const { Favourite } = require("../models/favourite.model");
const { constants } = require("../config/constants");

class FavouriteController {
  // Add a new favourite
  static async addFavourite(req, res, next) {
    try {
      const userId = req.user._id;
      const productId = req.params.id;

      // Check if already favourited
      const exists = await Favourite.findOne({ userId, productId });
      if (exists) {
        return res.status(constants.CONFLICT_ERROR).json({
          success: false,
          message: "This product is already in favourites.",
        });
      }

      const favourite = new Favourite({ userId, productId });
      const saved = await favourite.save();

      return res.status(constants.CREATED).json({
        success: true,
        message: "Product added to favourites.",
        favourite: saved,
      });
    } catch (error) {
      console.error("Add Favourite Error:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get all favourites
  static async getAllFavourites(req, res) {
    try {
      const favourites = await Favourite.find();
      return res.status(200).json({
        success: true,
        favourites: favourites,
      });
    } catch (error) {
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get all favourites by a specific user
  static async getAllFavouritesByUser(req, res) {
    try {
      const userId = req.params.id;

      const favourites = await Favourite.find({ userId }).populate("productId");

      return res.status(constants.SUCCESS).json({
        success: true,
        favourites,
      });
    } catch (error) {
      console.error("Get Favourites Error:", error.message);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Get favourite by ID
  static async getFavouriteById(req, res) {
    try {
      const id = req.params.id;

      const favourite = await Favourite.findById(id)
        .populate("productId")
        .populate("userId");

      if (!favourite) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Favourite not found.",
        });
      }

      // Transform the response
      const transformedFavourite = {
        _id: favourite._id,
        user: favourite.userId,
        product: favourite.productId,
        createdAt: favourite.createdAt,
        updatedAt: favourite.updatedAt,
      };

      return res.status(constants.SUCCESS).json({
        success: true,
        favourite: transformedFavourite,
      });
    } catch (error) {
      console.error("Error retrieving favourite by ID:", error);
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Update favourite
  static async updateFavourite(req, res) {
    try {
      const updated = await Favourite.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updated) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Favourite not found.",
        });
      }
      return res.status(constants.SUCCESS).json({
        success: true,
        message: "Favourite updated successfully.",
        favourite: updated,
      });
    } catch (error) {
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }

  // Delete favourite
  static async deleteFavourite(req, res) {
    try {
      const userId = req.user._id;

      const deleted = await Favourite.findByIdAndDelete({
        _id: req.params.id,
        userId,
      });
      if (!deleted) {
        return res.status(constants.NOT_FOUND).json({
          success: false,
          message: "Favourite not found.",
        });
      }
      return res.status(constants.SUCCESS).json({
        success: true,
        message: "Favourite deleted successfully.",
      });
    } catch (error) {
      res.status(constants.SERVER_ERROR);
      next(error);
    }
  }
}

module.exports = FavouriteController;
