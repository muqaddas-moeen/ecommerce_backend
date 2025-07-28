const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String },
    size: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    imageUrl: { type: String },
    isNew: { type: Boolean, default: false },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
