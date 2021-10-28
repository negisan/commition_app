const express = require('express')
const router = express.Router()
const Joi = require('joi')
const userService = require('services/user.service')

// route
router.post('/signin', authenticate)

module.exports = router

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((token) => {
      res.json(token)
    })
    .catch(next)
}
