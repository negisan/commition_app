const fs = require('fs')

const db = require('src/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  getUser,
  getUsers,
  getUserArtworks,
  searchUser,
}

async function getUsers(user_type, page) {
  try {
    const perPage = 20
    if (user_type === 'creator') {
      const creators = await db.User.findAll({
        where: { isCreator: true },
        offset: (page - 1) * perPage,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      })
      const creatorsAttachedIcon = creators.map((creator) => {
        creator.icon = fs.readFileSync(creator.icon).toString('base64')
        return creator
      })
      return creatorsAttachedIcon
    }
    if (user_type === 'client') {
      const clients = await db.User.findAll({
        where: { isClient: true },
        offset: (page - 1) * perPage,
        limit: perPage,
        order: [['createdAt', 'DESC']],
      })
      const clientsAttachedIcon = clients.map((client) => {
        client.icon = fs.readFileSync(client.icon).toString('base64')
        return client
      })
      return clientsAttachedIcon
    }
    throw 'getUsers関数はユーザタイプが必要です'
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
  const userAttachedIcon = Object.assign(user, {
    icon: fs.readFileSync(user.icon).toString('base64'),
  })
  return userAttachedIcon
}

async function getUserArtworks(userId, page) {
  try {
    const perpage = 15
    const artworks = await db.Artwork.findAll({
      where: { creatorId: userId },
      limit: perpage,
      offset: (page - 1) * perpage,
    })
    const artworksAttachedImage = artworks.map((artwork) => {
      artwork.content = fs.readFileSync(artwork.content).toString('base64')
      return artwork
    })
    return artworksAttachedImage
  } catch (err) {
    throw err
  }
}

async function searchUser(userName) {
  try {
    const users = await db.User.findAll({
      where: {
        name: { [Op.like]: `${userName}%` },
      },
      limit: 10,
    })
    const data = users.map((user) => {
      // リクエストが短時間で連続してくる恐れがあるのでアイコンはいったん送らない方針で
      // user.icon = fs.readFileSync(user.icon).toString('base64')
      user.icon = ''
      return user
    })
    return data
  } catch (err) {
    throw err
  }
}
