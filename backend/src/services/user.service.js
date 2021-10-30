const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('src/models')
const config = require('src/config/config.json')

module.exports = {
  authenticate,
  create,
  show,
}

async function authenticate({ email, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw 'パスワードが間違っています'
  }

  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
  return { token }
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw params.email + 'は既に使われています。'
  }
  if (await db.User.findOne({ where: { name: params.name } })) {
    throw params.name + 'は既に使われています。'
  }

  // hash password
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10)
  }
  // save user
  await db.User.create(params)

  // return token
  const user = await db.User.findOne({ where: { email: params.email } })
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
  return { token }
}

async function show(req) {
  return await omitHash(req.user)
}

// helper function

async function getUser(id) {
  const user = await db.User.findByPk(id)
  if (!user) throw 'ユーザーが見つかりません'
  return user
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user
  return userWithoutHash
}
