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
  zuriInternshipMentorApplication,
  applicationValidationRules,
  getAllMentorApplication,
  getSingleMentorApplication,
  getAllMentors,
  deactivateMentor
} = require('../controller/zuriInternship-mentorController');

// Internship mentor routes
router.post('/mentors/apply', applicationValidationRules(), zuriInternshipMentorApplication);
router.get('/mentors', getAllMentorApplication);
router.get('/mentors/:id', getSingleMentorApplication);
router.get('/mentor/all', getAllMentors);
router.delete('/mentor/delete/:mentorId', deactivateMentor);

// Zuri Intern routes
router.post('/intern/apply', zuriInternValidationRules(), zuriInternApplication);
router.get('/intern/all', getAllInterns);
router.get('/intern/track', filterInterns);
router.delete('/intern/delete/:internId', deactivateIntern);

module.exports = router;
