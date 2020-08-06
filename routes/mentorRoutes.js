const express = require('express');
const router = express.Router();
const { createApplication, declineApplication, acceptApplication, allApplication } = require('../controller/mentorTraningController')

router.post('/mentor/apply', createApplication);
router.patch('/mentor/:id/decline', declineApplication);
router.patch('/mentor/:id/accept', acceptApplication);
router.get('/mentor/applications', allApplication);


module.exports = router;