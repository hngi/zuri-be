const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const ZuriIntern = require('../models/ZuriInternModel');

const {
    responseHandler
} = require('../utils/responseHandler');

module.exports = {
    getAllInterns: async (req, res) => {
        let searchValue;
        if (req.query.firstName) {
            searchValue = {
                firstName: req.query.firstName
            }
        } else {
            searchValue = {}
        }
        try {
            const zuriInterns = await ZuriIntern.find(searchValue);
            return responseHandler(res, 'Success', 200, true, zuriInterns);

        } catch (err) {
            return responseHandler(res, 'An Error occured', 500, false, err);
        }
    }

};

const { responseHandler } = require('../utils/responseHandler');

// Zuri Intern Validation rules
const zuriInternValidationRules = () => [
  body('firstName').isString().not().isEmpty(),
  body('lastName').isString().not().isEmpty(),
  body('email').isEmail().not().isEmpty(),
  body('country').isString().not().isEmpty(),
  body('state').isString().not().isEmpty(),
  body('track').isString().not().isEmpty(),
  body('employmentStatus').isString().not().isEmpty(),
  body('gender').isString().not().isEmpty(),
  body('dob').isString().not().isEmpty(),
  body('phoneNumber').isMobilePhone().not().isEmpty()
];

// Zuri Intern Application
const zuriInternApplication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    const message = `${err[0].msg} in ${err[0].param}`;
    return responseHandler(res, message, 400);
  }

  const { email } = req.body;
  try {
    // check if the email is already in use
    const intern = await ZuriIntern.findOne({ email });
    if (intern) {
      return responseHandler(res, 'Email address already used for application', 400, true);
    }
    // create the new intern application
    let newIntern = new ZuriIntern(req.body);
    newIntern = await newIntern.save();
    return responseHandler(res, ' Application is successful', 201, true, { intern: newIntern });
  } catch (err) {
    return next(err);
  }
};


module.exports = {
  zuriInternValidationRules,
  zuriInternApplication,
};

