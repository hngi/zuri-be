const express = require('express');

const {
  login,
  traininglogin,
  logout
} = require('../controller/adminController');

const router = express.Router();

// Admin routes
router.post('/auth', login);
router.post('/traininglogin', traininglogin);
router.get('/logout', logout);
// router.post('/admin/create', newAdminValidationRules(), createAdmin);

module.exports = router;
