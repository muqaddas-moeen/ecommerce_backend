const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.post("/", ProductController.addProduct);
router.get("/", ProductController.getAllProducts);
router.get("/user/:id", ProductController.getAllProductsOfUser);
router.get("/category/:id", ProductController.getAllProductsByCategory);
router.get("/:id", ProductController.getProductById);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
