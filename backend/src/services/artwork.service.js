const fs = require('fs')

const db = require('src/models')

module.exports = {
  create,
  index,
  show,
}

async function create(user, file, query) {
  try {
    const request_id = query.request
    if (file === undefined) {
      throw 'ファイルを選択してください'
    }

    // Artwork作成
    const data = {
      creatorId: user.id,
      content:
        __basedir +
        '/resources/static/assets/uploads_artworks/' +
        file.filename,
    }
    await db.sequelize.transaction({}, async () => {
      const artwork = await db.Artwork.create(data)
      // Requestのフラグを更新
      await db.Request.findOne({
        where: { id: request_id },
      }).then((request) => {
        if (request.creatorId !== user.id) {
          return Promise.reject('forbidden')
        }
        request.artworkId = artwork.id
        request.progressing = false
        request.submitted = true
        request.save()
      })
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function index(page, sort) {
  try {
    const perPage = 20
    if (sort === 'new_date') {
      const artworks = await db.Artwork.findAll({
        offset: (page - 1) * perPage,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      })
      const artworksAttachedImage = artworks.map((artwork) => {
        artwork.content = fs.readFileSync(artwork.content).toString('base64')
        return artwork
      })
      return artworksAttachedImage
    }
  } catch (err) {
    throw err
  }
}

async function show(artworkId) {
  const requestWithArtwork = await db.Request.findOne({
    where: { artworkId: artworkId },
    include: [
      {
        model: db.User,
        as: 'client',
      },
      {
        model: db.User,
        as: 'creator',
      },
      {
        model: db.Artwork,
      },
    ],
  })
  const requestWithArtworkAttachedImages = Object.assign(requestWithArtwork, {
    Artwork: Object.assign(requestWithArtwork.Artwork, {
      content: fs
        .readFileSync(requestWithArtwork.Artwork.content)
        .toString('base64'),
    }),
    client: Object.assign(requestWithArtwork.client, {
      icon: fs.readFileSync(requestWithArtwork.client.icon).toString('base64'),
    }),
    creator: Object.assign(requestWithArtwork.creator, {
      icon: fs.readFileSync(requestWithArtwork.creator.icon).toString('base64'),
    }),
  })
  return requestWithArtworkAttachedImages
}
