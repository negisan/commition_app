const express = require('express')
const router = express.Router()
const userService = require('services/user.service')

// route
router.post('/', create)

module.exports = router

function create(req, res, next) {
  userService
    .create(req.body)
    .then((token) => res.json(token))
    .catch(next)
}
