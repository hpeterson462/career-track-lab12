const { Router } = require('express');
const UserService = require('../services/user-service');
const ensureAuth = require('../middleware/ensure.auth');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const attachCookie = (user, res) => {
  const token = UserService.makeToken(user);
  res.cookie('session', token, {
    expAge: ONE_DAY_IN_MS,
    httpOnly: true,
    sameSite: 'none'
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .createUser(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    UserService
      .authorize(req.body)
      .then(user => {
        attachCookie(user, res);
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
