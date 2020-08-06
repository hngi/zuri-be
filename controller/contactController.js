const { body } = require('express-validator');
const ContactModel = require('../models/Contact');
const { responseHandler } = require('../utils/responseHandler');

// contact validation rules
exports.contactValidationRules = () => [
  body('name', 'name is required and it should be a string')
    .isString()
    .not()
    .isEmpty(),
  body('email').isEmail(),
  body('message', 'message is required and it should be a string')
    .isString()
    .not()
    .isEmpty()
];

exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await ContactModel.create({ name, email, message });
    contact.save();
    responseHandler(res, 'Contact created successfuly', 201, true, contact);
  } catch (err) {
    responseHandler(
      res,
      'Something went wrong please try again',
      500,
      false,
      err.message
    );
  }
};
