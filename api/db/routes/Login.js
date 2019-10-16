const express = require('express');
const User = require('../models/user.model');

const route = express.Router();

route.post('/', async (req, res) => {
  User.findOne({ userName: req.body.userName, password: req.body.password })
    .then(user => res.json(user))
    .catch(err => res.json(err));
  // console.log(user);
  // try {
  //   res.send(err)
  // } catch (e) {
  //   res.json(user)
  // }
})

module.exports = route;