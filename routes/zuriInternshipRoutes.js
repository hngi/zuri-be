const express = require('express');

const router = express.Router();

const {
  filterInterns,
  zuriInternValidationRules,
  zuriInternApplication,
  getAllInterns,
  deactivateIntern
} = require('../controller/zuriInternship-internController');

const {
  internshipMentorApplication,
  applicationValidationRules,
  getAllMentorApplication,
  getSingleMentorApplication
} = require('../controller/zuriInternship-mentorController');

// Internship mentor routes
router.post('/mentors/apply', applicationValidationRules(), internshipMentorApplication);
router.get('/mentors', getAllMentorApplication);
router.get('/mentors/:id', getSingleMentorApplication);

// Zuri Intern routes
router.post('/intern/apply', zuriInternValidationRules(), zuriInternApplication);
router.get('/intern/all', getAllInterns);
router.get('/intern/track', filterInterns);
router.delete('/intern/delete/:internId', deactivateIntern);

module.exports = router;
