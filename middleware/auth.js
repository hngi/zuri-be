const jwt = require('jsonwebtoken');
const { JWTKey } = require('../config');
const Admin = require('../models/Admin');
const { responseHandler } = require('../utils/responseHandler');

const authourizeSuperadmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      responseHandler(res, 'unauthorized access', 400);
    }

    const decodeData = await jwt.verify(token, JWTKey);

    const isSuperadmin = await Admin.findById({ _id: decodeData.adminId });
    if (!isSuperadmin) return responseHandler(res, 'unauthorized access');
    if (isSuperadmin.role !== 'superAdmin') {
      responseHandler(res, 'unauthorized access', 400);
    }
    return next();
  } catch (error) {
    responseHandler(res, 'An error occured', 500);
  }
};

module.exports = {
  authourizeSuperadmin
};
