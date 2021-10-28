const express = require('express')
const router = express.Router()
const userService = require('services/user.service')

// route
router.post('/', create)
router.get('/', show)

module.exports = router

function create(req, res, next) {
  userService
    .create(req.body)
    .then((token) => res.json(token))
    .catch(next)
}

function show(req, res, next) {
  userService
    .show(req)
    .then((user) => res.json(user))
    .catch(next)
}
