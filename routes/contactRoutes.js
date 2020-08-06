const express = require('express');
const contactController = require('../controller/contactController');
const { validate } = require('../utils/validator');

const router = express.Router();

// contact creation route
router.post(
  '/contacts',
  contactController.contactValidationRules(),
  validate,
  contactController.createContact
);

module.exports = router;
