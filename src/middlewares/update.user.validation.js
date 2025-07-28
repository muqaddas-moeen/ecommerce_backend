const { body, validationResult } = require("express-validator");

const validateUserUpdate = [
  // Name validation
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim(),

  // Email validation
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email is not valid")
    .normalizeEmail(),

  // Result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateUserUpdate;
