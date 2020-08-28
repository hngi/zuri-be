const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Mentor = require('../models/ZuriInternship-MentorModel');
const { responseHandler } = require('../utils/responseHandler');

// Application rules
const applicationValidationRules = () => [
  body('firstName').isString().not().isEmpty(),
  body('lastName').isString().not().isEmpty(),
  body('email').isEmail().not().isEmpty(),
  body('country').isString().not().isEmpty(),
  body('track').isString().not().isEmpty(),
  body('employmentStatus').isString().not().isEmpty(),
  body('gender').isString().not().isEmpty(),
  body('dob').isString().not().isEmpty(),
  body('stateOfResidence').isString().not().isEmpty(),
  body('cvLink').optional().isURL(),
  body('phoneNumber').isMobilePhone().not().isEmpty()
];

const zuriInternshipMentorApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    const message = `${err[0].msg} in ${err[0].param}`;
    return responseHandler(res, message, 400);
  }

  const { email } = req.body;
  try {
    // check if the email is already in use
    const mentor = await Mentor.findOne({ email });
    if (mentor) {
      return responseHandler(res, 'Email address already used for application', 400, true);
    }
    // create the new mentor application
    let newMentor = new Mentor(req.body);
    // save the application
    newMentor = await newMentor.save();
    // return the response on success
    return responseHandler(res, ' Application successful', 201, true, { mentor: newMentor });
  } catch (err) {
    return responseHandler(res, err.message, 500, false);
  }
};

const getAllMentorApplication = async (req, res, next) => {
  const queryArray = [];
  // All query parameters
  const params = req.query;
  // Each query parameter should be assigned as an object and added the query array
  Object.entries(params).forEach((param) => {
    if (param[0] === 's' || param[0] === 'search') {
      const queryObj = {
        $or: [{ firstName: { $regex: `${param[1]}` } },
          { lastName: { $regex: `${param[1]}` } }
        ]
      };
      queryArray.push(queryObj);
      return;
    }
    const queryObj = { [param[0]]: param[1] };
    queryArray.push(queryObj);
  });
  // add this so that all applications will be returned when no query param is present
  queryArray.push({});
  try {
    const mentors = await Mentor.find({ $and: queryArray })
      .sort({ updatedAt: 'desc' });
    return responseHandler(res, 'All mentor applications', 200, true, { mentors });
  } catch (err) {
    return next(err);
  }
};

const getSingleMentorApplication = async (req, res, next) => {
  const mentorId = req.params.id;
  if (!mongoose.isValidObjectId(mentorId)) {
    return responseHandler(res, 'Invalid Id for a mentor', 400);
  }
  try {
    const mentor = await Mentor.findOne({ _id: mentorId });
    if (!mentor) {
      return responseHandler(res, 'Mentor not found', 404);
    }
    return responseHandler(res, 'Mentor ', 200, true, { mentor });
  } catch (err) {
    return next(err);
  }
};

const getAllMentors = async (req, res) => {
  try {
    const data = await Mentor.find();
    if (!data) {
      return responseHandler(res, 'Data unavailable!', 401, false);
    }
    return responseHandler(res, 'Successfully retrieved all internship mentors', 200, true, data);
  } catch (error) {
    return responseHandler(res, 'An error occured, could not retrieve mentors', 500, false);
  }
};

const deactivateMentor = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById({ _id: mentorId });

    if (!mentor) {
      return responseHandler(res, 'Mentor does not exist!', 401, false);
    }

    await Mentor.findByIdAndDelete(mentorId, (err) => {
      if (err) {
        return responseHandler(res, err.message, 400, false);
      }
      return responseHandler(res, 'Mentor deleted successfully', 200, true, mentor);
    });
  } catch (error) {
    return responseHandler(res, error.message, 500, false);
  }
};

module.exports = {
  applicationValidationRules,
  zuriInternshipMentorApplication,
  getAllMentorApplication,
  getSingleMentorApplication,
  getAllMentors,
  deactivateMentor
};
