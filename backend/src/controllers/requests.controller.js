const express = require('express')
const router = express.Router()
const authorize = require('src/_middleware/authorize')
const requestService = require('src/services/request.service')

// route
router.post('/', authorize(), create)
router.post('/cancel', authorize(), cancel)
router.post('/accept', authorize(), accept)
router.post('/complete', authorize(), complete)
router.get('/client', authorize(), getClientRequests)
router.get('/creator', authorize(), getCreatorRequests)

module.exports = router

function create(req, res, next) {
  if (req.user.id === req.body.order.creatorId) {
    res.status(403).send('Forbidden')
  }
  requestService
    .create(req.body.order)
    .then(() => {
      res.status(200).send()
    })
    .catch(next)
}

function accept(req, res, next) {
  requestService
    .accept(req.user, req.query)
    .then(() => {
      res.status(200).send()
    })
    .catch(next)
}

function cancel(req, res, next) {
  requestService
    .cancel(req.query)
    .then(() => {
      res.status(200).send()
    })
    .catch(next)
}

function complete(req, res, next) {
  requestService
    .complete(req.user, req.query, req.body.comment)
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

function getCreatorRequests(req, res, next) {
  requestService
    .getCreatorRequests(req.user, req.query)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(next)
}
