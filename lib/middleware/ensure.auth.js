const User = require('../models/user');
const UserService = require('../services/user-service');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    const payload = UserService.verifyToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
      profilePhotoUrl: payload.profilePhotoUrl
    };
    next();
  } catch (error) {
    next(error);
  }
};