/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-console */
const { isEmpty, isEmail } = require('validator');
// const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admins = require('../models/Admin');
const { JWTKey } = require('../config');
const { responseHandler } = require('../utils/responseHandler');

// const newAdminValidationRules = () => [
//   body('firstName').isString(),
//   body('lastName').isString(),
//   body('email').isEmail(),
//   body('adminpassword').isLength({ min: 5 }),
//   body('category').isString(),
//   body('role').isString()
// ];

// Admin Login
const login = (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    responseHandler(res, 'unauthorized access', 401);
  }
  if (!isEmail(email)) {
    responseHandler(res, 'Please enter a valid email');
  }
  Admins.findOne({ email }).then((admin) => {
    if (!admin) {
      responseHandler(res, 'Email does not exist in our record');
      return;
    }
    bcrypt.compare(password, admin.password).then(
      (valid) => {
        if (!valid) {
          responseHandler(res, 'Please enter a valid password');
        }
        const token = jwt.sign(
          { adminId: admin._id },
          JWTKey,
          { expiresIn: '24h' }
        );
        const { name, role, category } = admin;
        responseHandler(res, 'token gen and successful login', 200, true, {
          name,
          email,
          role,
          category,
          authorization: { token }
        });
      }
    ).catch(
      (err) => {
        res.status(501).json({
          error: err
        });
      }
    );
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
};

const traininglogin = (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    responseHandler(res, 'unauthorized access', 401);
  }
  if (!isEmail(email)) {
    responseHandler(res, 'Please enter a valid email');
  }
  Admins.findOne({ email, category: 'startng'}).then((admin) => {
    if (!admin) {
      responseHandler(res, 'Email does not exist in our record');
      return;
    }
    bcrypt.compare(password, admin.password).then(
      (valid) => {
        if (!valid) {
          responseHandler(res, 'Please enter a valid password');
        }
        const token = jwt.sign(
          { adminId: admin._id },
          JWTKey,
          { expiresIn: '24h' }
        );
        const { name, role, category } = admin;
        responseHandler(res, 'token gen and successful login', 200, true, {
          name,
          email,
          role,
          category,
          authorization: { token }
        });
      }
    ).catch(
      (err) => {
        res.status(501).json({
          error: err
        });
      }
    );
  }).catch((err) => {
    res.status(500).json({
      error: err
    });
  });
};

const logout = (req, res) => {
  responseHandler(res, 'No Logout');
};

module.exports = {
  login,
  logout
};
