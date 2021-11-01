const express = require('express')
const router = express.Router()
const authorize = require('src/_middleware/authorize')
const requestService = require('src/services/request.service')

// route
router.post('/', authorize(), create)

module.exports = router

function create(req, res, next) {
  if (req.user.id === req.body.order.creator_id) {
    res.status(403).send('Forbidden')
  }
  requestService
    .create(req.body.order)
    .then(() => {
      res.status(200).send()
    })
    .catch(next)
}
