const db = require('src/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  create,
  accept,
  cancel,
  getClientRequests,
  getCreatorRequests,
}

async function create(order) {
  await db.Request.create(order)
  return Promise.resolve()
}

async function accept(user, query) {
  try {
    const request_id = query.request
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
    return Promise.resolve()
  } catch (err) {
    throw err
  }
}

async function cancel(query) {
  try {
    const request_id = query.request
    await db.Request.findOne({
      where: { id: request_id },
    }).then((request) => {
      request.state_default = false
      request.submitted = false
      request.progressing = false
      request.cancel = true
      request.save()
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
    return requests
  }

  if (query.state === 'cancel') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          cancel: true,
        },
      },
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
    return requests
  }

  if (query.state === 'progressing') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          progressing: true,
        },
      },
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
    return requests
  }

  if (query.state === 'submitted') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          submitted: true,
        },
      },
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
    return requests
  }

  if (query.state === 'done') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          clientId: user.id,
          done: true,
        },
      },
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
    return requests
  }

  const requests = await db.Request.findAll({
    where: {
      clientId: user.id,
    },
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
  return requests
}
// RoleCreatorRequests ================================================================================
async function getCreatorRequests(user, query) {
  if (query.state === 'state_default') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          state_default: true,
        },
      },
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
    return requests
  }

  if (query.state === 'cancel') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          cancel: true,
        },
      },
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
    return requests
  }

  if (query.state === 'progressing') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          progressing: true,
        },
      },
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
    return requests
  }

  if (query.state === 'submitted') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          submitted: true,
        },
      },
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
    return requests
  }

  if (query.state === 'done') {
    const requests = await db.Request.findAll({
      where: {
        [Op.and]: {
          creatorId: user.id,
          done: true,
        },
      },
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
    return requests
  }

  const requests = await db.Request.findAll({
    where: {
      creatorId: user.id,
    },
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
  return requests
}
