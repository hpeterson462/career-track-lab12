const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const createUser = async ({ email, password, profilePhotoUrl }) => {
  const passwordHash = await bcrypt.hash(password, 14);
  return User.insert({ email, passwordHash, profilePhotoUrl });
};

const makeToken = user => {
  const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
};

module.exports = {
  createUser,
  makeToken
};