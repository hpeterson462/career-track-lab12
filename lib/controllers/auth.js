const { Router } = require('express');
const UserService = require('../services/user-service');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    userService
      .create(req.body)
      .then(user => {
        UserService.makeToken(user);
        res.send(user);
      })
      .catch(next);
  });
