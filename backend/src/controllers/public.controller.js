const express = require('express')
const router = express.Router()
const publicService = require('src/services/public.service')

// route
router.get('/user/artworks', getUserArtworks)
router.get('/users', getUsers)
router.get('/users/:name', getUser)

module.exports = router

function getUsers(req, res, next) {
  publicService
    .getUsers(req.query.page)
    .then((users) => res.json(users))
    .catch(next)
}

function getUser(req, res, next) {
  publicService
    .getUser(req.params.name)
    .then((user) => res.json(user))
    .catch(next)
}

function getUserArtworks(req, res, next) {
  publicService
    .getUserArtworks(req.query.user, req.query.page)
    .then((artworks) => {
      res.json(artworks)
    })
    .catch(next)
}
