const express = require('express')
const router = express.Router()
const userService = require('src/services/user.service')
const authorize = require('src/_middleware/authorize')
const upload = require('src/_middleware/upload-user-icon')

// route
router.post('/', create)
router.get('/', authorize(), show)
router.put('/icon', authorize(), upload.single('file'), updateUserIcon)

module.exports = router

function create(req, res, next) {
  userService
    .create(req.body)
    .then((token) => {
      res.json(token)
    })
    .catch(next)
}

function show(req, res, next) {
  userService
    .show(req)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
}

function updateUserIcon(req, res, next) {
  userService
    .updateUserIcon(req)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
}
