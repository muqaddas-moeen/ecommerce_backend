const { body, validationResult } = require("express-validator");

const validateUser = [
  // Name validation
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  // Email validation
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  // Password validation
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  // Result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = {};

      // Only show the first error per field
      errors.array().forEach((err) => {
        if (!formattedErrors[err.path]) {
          formattedErrors[err.path] = err.msg;
        }
      });

      return res.status(400).json({
        message: "Validation Error",
        errors: formattedErrors,
      });
    }

    next();
  },
];

module.exports = validateUser;
