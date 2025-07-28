const { constants } = require("../config/constants");

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  // Handle MongoDB duplicate key error (code 11000)
  if (err.code === 11000) {
    statusCode = constants.VALIDATION_ERROR;
    const duplicateField = Object.keys(err.keyValue)[0];
    const message = `${duplicateField} already exists`;

    return res.status(statusCode).json({
      message,
      field: duplicateField,
    });
  }

  // Handle custom errors or default
  res.status(statusCode).json({
    success: false,
    message: err.message || "An unknown error occurred",
    // stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
