const express = require("express");
const router = express.Router();
const FavouriteController = require("../controllers/favourite.controller");

// Add to favourites
router.post("/:id", FavouriteController.addFavourite);

// Get all favourites
router.get("/", FavouriteController.getAllFavourites);

// Get all favourites by user
router.get("/user/:id", FavouriteController.getAllFavouritesByUser);

// Get a favourite by ID
router.get("/:id", FavouriteController.getFavouriteById);

// Update a favourite
router.put("/:id", FavouriteController.updateFavourite);

// Remove a favourite
router.delete("/:id", FavouriteController.deleteFavourite);

module.exports = router;
