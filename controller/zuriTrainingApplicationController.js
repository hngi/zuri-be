/* eslint-disable new-cap */
/* eslint-disable no-console */
const { body, validationResult } = require('express-validator');
const Intern = require('../models/ZuriTrainingModel');
const { responseHandler } = require('../utils/responseHandler');

const internApplicationValidationRules = () => [
  body('firstName').isString().not().isEmpty(),
  body('lastName').isString().not().isEmpty(),
  body('phoneNumber').isMobilePhone().not().isEmpty(),
  body('email').isEmail().not().isEmpty(),
  body('track').isString().not().isEmpty(),
  body('course').isString().not().isEmpty(),
  body('level').isString().not().isEmpty()
];
const createIntern = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    track,
    course,
    level
  } = req.body;

  try {
    const errors = validationResult(req);
    const err = errors.array();
    const myarray = [];
    err.forEach((er) => {
      const message = `${er.msg} in ${er.param}`;
      myarray.push(message);
    });
    if (myarray.length > 0) {
      return responseHandler(res, 'An error occured in your inputs', 422, false, myarray);
    }
  } catch (error) {
    return false;
  }

  try {
    const checkIntern = await Intern.findOne({ email });
    if (checkIntern) {
      return responseHandler(res, 'Record already exist', 401, false);
    }
    const intern = new Intern({
      firstName,
      lastName,
      phoneNumber,
      email,
      track,
      course,
      level
    });
    const recordSave = await intern.save();
    if (!recordSave) {
      return responseHandler(res, 'Unable to register application', 401, false);
    }
    return responseHandler(res, 'Application Successfully Registered', 200, true, recordSave);
  } catch (error) {
    return responseHandler(res, 'Inputs error', 500, false, error.message);
  }
};

module.exports = {
  createIntern,
  internApplicationValidationRules
};
