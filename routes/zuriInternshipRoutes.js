const express = require('express');

const router = express.Router();

const {
  filterInterns,
  zuriInternValidationRules,
  zuriInternApplication,
  getAllInterns,
  getZuriInternByID
} = require('../controller/zuriInternController');

const {
  internshipMentorApplication,
  applicationValidationRules,
  getAllMentorApplication,
  getAllAcceptedMentors,
  getSingleMentorApplication,
  acceptApplication
} = require('../controller/internshipMentorController');

// Internship mentor routes
router.get('/mentors/accepted', getAllAcceptedMentors);

router.post('/mentors/apply', applicationValidationRules(), internshipMentorApplication);
router.get('/mentors', getAllMentorApplication);
router.get('/mentors/:id', getSingleMentorApplication);
router.patch('/mentors/:id/accept', acceptApplication);

// Zuri Intern routes
router.get('/intern', getAllInterns);
router.get('/intern/:id', getZuriInternByID); 
router.post('/intern/apply', zuriInternValidationRules(), zuriInternApplication);
router.get('/intern/track', filterInterns);

module.exports = router;

