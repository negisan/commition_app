const db = require('src/models')

module.exports = {
  create,
}

async function create(order) {
  await db.Request.create(order)
  return Promise.resolve()
}
