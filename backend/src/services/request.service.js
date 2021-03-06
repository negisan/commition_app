const fs = require('fs')
const db = require('src/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  create,
  accept,
  cancel,
  complete,
  getClientRequests,
  getCreatorRequests,
}

async function create(order) {
  try {
    const client_id = order.clientId
    await db.sequelize.transaction({}, async () => {
      await db.Request.create(order)
      // userのisClientフラグをtrueに更新
      await db.User.findOne({ where: { id: client_id } }).then((user) => {
        user.isClient = true
        user.save()
      })
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function accept(user, query) {
  try {
    const request_id = query.request
    await db.sequelize.transaction({}, async () => {
      await db.Request.findOne({
        where: { id: request_id },
      }).then((request) => {
        if (request.creatorId !== user.id) {
          return Promise.reject('forbidden')
        }
        request.state_default = false
        request.progressing = true
        request.save()
      })
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function cancel(query) {
  try {
    const request_id = query.request
    const updated_request = {
      state_default: false,
      submitted: false,
      progressing: false,
      cancel: true,
    }
    await db.sequelize.transaction({}, async () => {
      await db.Request.update(updated_request, {
        where: { id: request_id },
      })
      // 返金処理
      const request = await db.Request.findOne({ where: { id: request_id } })
      await db.User.findOne({
        where: { id: request.clientId },
      }).then((user) => {
        user.cash = user.cash + request.order_price
        user.save()
      })
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function complete(user, query, comment) {
  try {
    const request_id = query.request
    await db.sequelize.transaction({}, async () => {
      await db.Request.findOne({ where: { id: request_id } }).then(
        (request) => {
          if (request.clientId !== user.id) {
            return Promise.reject('forbidden')
          }
          request.thanks_comment = comment
          request.state_default = false
          request.progressing = false
          request.submitted = false
          request.done = true
          request.save()
        }
      )
      // 受注者の残高に料金を加算
      const request = await db.Request.findOne({ where: { id: request_id } })
      await db.User.findOne({
        where: { id: request.creatorId },
      }).then((user) => {
        user.cash = user.cash + request.order_price
        user.isCreator = true
        user.save()
      })
    })
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function getClientRequests(user, query) {
  if (query.state === 'state_default') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          state_default: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedIcon = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedIcon
  }

  if (query.state === 'cancel') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          cancel: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedIcon = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedIcon
  }

  if (query.state === 'progressing') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          progressing: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedIcon = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedIcon
  }

  if (query.state === 'submitted') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          submitted: true,
        },
      },
      order: [['createdAt', 'DESC']],
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
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      request.Artwork.content = fs
        .readFileSync(request.Artwork.content)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  if (query.state === 'done') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          done: true,
        },
      },
      order: [['createdAt', 'DESC']],
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
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      request.Artwork.content = fs
        .readFileSync(request.Artwork.content)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  throw `No match ${query.state} - query state`
}

async function getCreatorRequests(user, query) {
  if (query.state === 'state_default') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          state_default: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  if (query.state === 'cancel') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          cancel: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  if (query.state === 'progressing') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          progressing: true,
        },
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: db.User,
          as: 'client',
        },
        {
          model: db.User,
          as: 'creator',
        },
      ],
    })
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  if (query.state === 'submitted') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          submitted: true,
        },
      },
      order: [['createdAt', 'DESC']],
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
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      request.Artwork.content = fs
        .readFileSync(request.Artwork.content)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  if (query.state === 'done') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          done: true,
        },
      },
      order: [['createdAt', 'DESC']],
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
    const requestsAttachedImages = requests.map((request) => {
      request.client.icon = fs
        .readFileSync(request.client.icon)
        .toString('base64')
      request.creator.icon = fs
        .readFileSync(request.creator.icon)
        .toString('base64')
      request.Artwork.content = fs
        .readFileSync(request.Artwork.content)
        .toString('base64')
      return request
    })
    return requestsAttachedImages
  }

  throw `No match ${query.state} - query state`
}
