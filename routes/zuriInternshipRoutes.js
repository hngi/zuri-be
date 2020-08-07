const express = require('express');

const router = express.Router();

const {
  zuriInternValidationRules,
  zuriInternApplication,
  getAllInterns
} = require('../controller/zuriInternController');

const {
  internshipMentorApplication,
  applicationValidationRules,
  getAllMentorApplication,
  getSingleMentorApplication
} = require('../controller/internshipMentorController');

// Internship mentor routes
router.post('/mentors/apply', applicationValidationRules(), internshipMentorApplication);
router.get('/mentors', getAllMentorApplication);
router.get('/mentors/:id', getSingleMentorApplication);

// Zuri Intern routes
router.post('/intern/apply', zuriInternValidationRules(), zuriInternApplication);
router.get('/intern', getAllInterns);


module.exports = router;