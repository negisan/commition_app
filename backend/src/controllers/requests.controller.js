const express = require('express')
const router = express.Router()
const authorize = require('src/_middleware/authorize')
const requestService = require('src/services/request.service')

// route
router.post('/', authorize(), create)
router.get('/client', authorize(), getClientRequests)
// router.get('/creator', authorize(), getCreatorRequests)

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

function getClientRequests(req, res, next) {
  requestService
    .getClientRequests(req.user, req.query)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(next)
}
