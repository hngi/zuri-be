const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Mentor = require('../models/ZuriInternMentorModel');
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

const internshipMentorApplication = async (req, res) => {
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
// Get all accepted mentor applications
const getAllAcceptedMentors = async (req, res, next) => {
  const queryArray = [];
  // All query parameters
  const params = req.query;
  // Each query parameter should be assigned as an object and added the query array
  Object.entries(params).forEach((param) => {
    const queryObj = { [param[0]]: param[1] };
    queryArray.push(queryObj);
  });
  // add this so that all accepted applications will be returned when no query param is present
  queryArray.push({ applicationState: 'accepted' });
  try {
    const mentors = await Mentor.find({ $and: queryArray });
    return responseHandler(res, 'All accepted mentor applications', 200, true, { mentors });
  } catch (err) {
    return next(err);
  }
};

// accept a mentors application
const acceptApplication = async (req, res, next) => {
  const mentorId = req.params.id;

  if (!mongoose.isValidObjectId(mentorId)) {
    return responseHandler(res, 'Invalid Id for mentor', 400, false);
  }

  try {
    const mentor = await Mentor.findOne({ _id: mentorId });
    if (!mentor) {
      return responseHandler(res, 'Mentor not found', 404, false);
    }

    await mentor.update({ applicationState: 'accepted' });
    return responseHandler(res, 'Mentor application accepted', 200, true);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  applicationValidationRules,
  internshipMentorApplication,
  getAllMentorApplication,
  getSingleMentorApplication,
  getAllAcceptedMentors,
  acceptApplication
};
