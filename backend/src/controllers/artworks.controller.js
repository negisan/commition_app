const express = require('express')
const router = express.Router()
const authorize = require('src/_middleware/authorize')
const artworkService = require('src/services/artwork.service')
const upload = require('src/_middleware/upload-artworks')

// route
router.post('/', authorize(), upload.single('file'), create)
router.get('/:id', show)

module.exports = router


function create(req, res, next) {
  artworkService
  .create(req.user, req.file, req.query)
  .then(() => {
    res.status(200).send()
  })
  .catch(next)
}

function show(req, res, next) {
  artworkService
    .show(req.params.id)
    .then((requestWithArtwork) => {
      res.json(requestWithArtwork)
    })
    .catch(next)
}