const db = require('src/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  create,
  getClientRequests,
}

async function create(order) {
  await db.Request.create(order)
  return Promise.resolve()
}

async function getClientRequests(user, query) {
  console.log('query=============================', query)
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
