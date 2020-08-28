const { body, validationResult } = require('express-validator');
const ZuriIntern = require('../models/ZuriInternship-InternModel');

const { responseHandler } = require('../utils/responseHandler');

// Zuri Get all interns
const getAllInterns = async (req, res) => {
  try {
    const data = await ZuriIntern.find();
    if (!data) {
      return responseHandler(res, 'Data unavailable!', 401, false);
    }
    return responseHandler(res, 'Successfully retrieved all interns', 200, true, data);
  } catch (error) {
    return responseHandler(res, 'An error occured, could not retrieve interns', 500, false);
  }
};

// Zuri Filter interns based on track i.e backend frontend
const filterInterns = async (req, res) => {
  let filterValue;
  if (req.query.track) {
    filterValue = {
      track: req.query.firstName,
    };
  } else {
    filterValue = {
      track: ''
    };
  }
  try {
    const zuriInterns = await ZuriIntern.find(filterValue);
    return responseHandler(res, 'Success', 200, true, zuriInterns);
  } catch (err) {
    return responseHandler(res, 'An Error occured', 500, false, err);
  }
};

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

// ZuriInternship Intern Application
const zuriInternApplication = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    const message = `${err[0].msg} in ${err[0].param}`;
    return responseHandler(res, message, 400);
  }

  const { email } = req.body;
  try {
    const intern = await ZuriIntern.findOne({ email });
    if (intern) {
      return responseHandler(res, 'Email address already used for application', 400, true);
    }
    let newIntern = new ZuriIntern(req.body);
    newIntern = await newIntern.save();
    return responseHandler(res, ' Application is successful', 201, true, {
      data: newIntern
    });
  } catch (err) {
    return next(err);
  }
};

const deactivateIntern = async (req, res) => {
  try {
    const { internId } = req.params;
    const intern = await ZuriIntern.findById({ _id: internId });

    if (!intern) {
      return responseHandler(res, 'Intern does not exist!', 401, false);
    }

    await ZuriIntern.findByIdAndDelete(internId, (err) => {
      if (err) {
        return responseHandler(res, err.message, 400, false);
      }
      return responseHandler(res, 'Intern deleted successfully', 200, true, intern);
    });
  } catch (error) {
    return responseHandler(res, error.message, 500, false);
  }
};

module.exports = {
  zuriInternValidationRules,
  zuriInternApplication,
  getAllInterns,
  filterInterns,
  deactivateIntern
};
