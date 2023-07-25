const { validationResult } = require("express-validator");

const validationErrorHandler = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    next();
  } else {
    const errors = result.array();
    res.status(400);
    next(errors);
  }
};

module.exports = { validationErrorHandler };
