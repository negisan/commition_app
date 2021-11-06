const db = require('src/models')

module.exports = {
  getUser,
  getUsers,
  getUserArtworks,
}

async function getUsers(page) {
  try {
    const perPage = 20
    const users = await db.User.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [['createdAt', 'DESC']],
    })
    return users
  } catch (err) {
    throw err
  }
}

async function getUser(userName) {
  const user = await db.User.findOne({
    where: { name: userName },
  })

  if (!user) {
    throw 'ユーザーが存在しません'
  }

  return user
}

async function getUserArtworks(userId, page) {
  try {
    const perpage = 15
    const artworks = await db.Artwork.findAll({
      where: { creatorId: userId },
      limit: perpage,
      offset: (page - 1) * perpage,
    })
    return artworks
  } catch (err) {
    throw err
  }
}
