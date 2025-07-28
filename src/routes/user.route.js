const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const validateUser = require("../middlewares/user.validation");
const validateUserUpdate = require("../middlewares/update.user.validation");

router.post("/", validateUser, UserController.createUser);
router.get("/", UserController.getUsers);
router.put("/profile/update", validateUserUpdate, UserController.updateUser);
router.get("/profile", UserController.getUserProfile);
router.get("/:id", UserController.getUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
