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
      content: fs
        .readFileSync(
          __basedir +
            '/resources/static/assets/uploads_artworks/' +
            file.filename
        )
        .toString('base64'),
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
      return artworks
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
  return requestWithArtwork
}
