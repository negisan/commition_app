const fs = require('fs')

const db = require('src/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  create,
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
    const artwork = await db.Artwork.create(data)

    // Requestのフラグを更新
    await db.Request.findOne({
      where: { id: request_id },
    }).then((request) => {
      request.artworkId = artwork.id
      request.progressing = false
      request.submitted = true
      request.save()
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}
