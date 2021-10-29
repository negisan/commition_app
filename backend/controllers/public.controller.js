const express = require('express')
const router = express.Router()
const publicService = require('services/public.service')

// route
router.get('/user/:name', getUser)

module.exports = router

function getUser(req, res, next) {
  publicService
    .getUser(req.params.name)
    .then((user) => res.json(user))
    .catch(next)
}
