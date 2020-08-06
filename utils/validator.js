const { validationResult } = require('express-validator');
const { responseHandler } = require('./responseHandler');

// util to be used in serverside validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  responseHandler(res, 'Validation failed', 422, false, extractedErrors);
};

module.exports = {
  validate
};
