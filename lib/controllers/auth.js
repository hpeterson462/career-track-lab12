const { Router } = require('express');
const UserService = require('../services/user-service');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .createUser(req.body)
      .then(user => {
        UserService.makeToken(user);
        res.send(user);
      })
      .catch(next);
  });
