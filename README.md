# 🛒 eCommerce Backend API

A scalable and modular **Node.js + Express + MongoDB** backend for an eCommerce application. This API handles users, products, categories, and favourites. It's organized using MVC structure and follows RESTful best practices.

---

## 📁 Project Structure

```
project-root/
│
├── controllers/ # All route logic
│ ├── auth.controller.js
│ ├── user.controller.js
│ ├── product.controller.js
│ ├── category.controller.js
│ └── favourite.controller.js
│
├── models/ # Mongoose models
│ ├── user.model.js
│ ├── product.model.js
│ ├── category.model.js
│ └── favourite.model.js
│
├── routes/ # API route definitions
│ ├── auth.routes.js
│ ├── user.routes.js
│ ├── product.routes.js
│ ├── category.routes.js
│ └── favourite.routes.js
│
├── middlewares/ # Custom middlewares
│ ├── auth.middleware.js
│ ├── error.handler.js
│ ├── update.user.validation.js
│ └── user.validation.js
│
├── config/ # App configuration
│ ├── constants.js # Centralized HTTP status codes
│ └── db.js # MongoDB connection
│
├── server.js # Application entry point
├── .env # Environment variables
├── .gitignore # Git ignore rules
└── README.md # You're here!
```

---

## 🚀 Features

- 🧑‍💼 **User Authentication**
- 🔐 **Password Hashing with bcrypt**
- 📦 **Product Management (CRUD)**
- 📂 **Category Management**
- ❤️ **Favorites List**
- 📑 **Middleware-Based Validation**
- 🛑 **Centralized Error Handling**
- 🌍 **MongoDB Integration via Mongoose**
- 🔧 **Modular Folder Structure**
- 📫 **Secure Environment Variables via `.env`**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following structure:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret

```

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/muqaddas-moeen/ecommerce_backend.git
cd ecommerce_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/userdb
JWT_SECRET=your_very_secure_jwt_secret
JWT_EXPIRES_IN=3d


```

### 4. Start the Server

```bash
npm run dev
```

> The server will run on `http://localhost:5000/`

---

## API Endpoints

## 👤 User Routes

| Method | Route           | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | /api/users      | Get all users                      |
| GET    | /api/users/\:id | Get single user and their products |
| POST   | /api/users      | Create a new user                  |
| PUT    | /api/users/\:id | Update existing user               |
| DELETE | /api/users/\:id | Delete a user                      |

## 📦 Product Routes

| Method | Route                       | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | /api/products               | Create a new product        |
| GET    | /api/products               | Get all products            |
| GET    | /api/products/\:id          | Get product by ID           |
| PUT    | /api/products/\:id          | Update product by ID        |
| DELETE | /api/products/\:id          | Delete product by ID        |
| GET    | /api/products/user/\:id     | Get products by user ID     |
| GET    | /api/products/category/\:id | Get products by category ID |

## 🗂️ Category Routes

| Method | Route                | Description           |
| ------ | -------------------- | --------------------- |
| POST   | /api/categories      | Create new category   |
| GET    | /api/categories      | Get all categories    |
| GET    | /api/categories/\:id | Get category by ID    |
| PUT    | /api/categories/\:id | Update category by ID |
| DELETE | /api/categories/\:id | Delete category by ID |

## ❤️ Favourite Routes

| Method | Route                | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | /api/favourites      | Add product to favourites |
| GET    | /api/favourites      | Get all favourites        |
| GET    | /api/favourites/\:id | Get favourite by ID       |
| DELETE | /api/favourites/\:id | Remove favourite by ID    |

---

## Example User Schema

```js
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
  },
  { timestamps: true }
);
```

## Example Product Schema

```js
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
```

## Example Category Schema

```js
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);
```

## Example Favourite Schema

```js
const favouriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
```

---

## Contact

If you're a student and need help understanding or customizing this project:

- Email: [moeenmuqaddas@gmail.com]
- GitHub: [github.com/muqaddas-moeen]

---
