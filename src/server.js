const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/error.handler");
require("dotenv").config(); // Load process.env
const connectDB = require("./config/db");

// Connect to DB
connectDB();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Root route for testing server
app.get("/", (req, res) => {
  res.send("eCommerce Backend API is running");
});

// Routes
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const favouriteRoutes = require("./routes/favourite.route");
const categoryRoutes = require("./routes/category.route");
const authMiddleware = require("./middlewares/auth.middleware");

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/products", authMiddleware, productRoutes);
app.use("/api/favourite", authMiddleware, favouriteRoutes);
app.use("/api/category", authMiddleware, categoryRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
