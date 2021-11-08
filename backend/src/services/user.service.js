const fs = require('fs')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('src/models')

module.exports = {
  authenticate,
  create,
  show,
  updateUserIcon,
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
  try {
    // validate
    if (await db.User.findOne({ where: { email: params.email } })) {
      throw params.email + 'は既に使われています。'
    }
    if (await db.User.findOne({ where: { name: params.name } })) {
      throw params.name + 'は既に使われています。'
    }

    if (params.password) {
      params.hash = await bcrypt.hash(params.password, 10)
    }
    await db.sequelize.transaction({}, async () => {
      await db.User.create(params)
    })

    const user = await db.User.findOne({ where: { email: params.email } })
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
    return { token }
  } catch (err) {
    throw err
  }
}

async function show(req) {
  return await omitHash(req.user)
}

async function updateUserIcon(req) {
  try {
    if (req.file == undefined) {
      throw 'ファイルを選択してください'
    }
    const new_user_icon = {
      icon: fs
        .readFileSync(
          __basedir +
            '/resources/static/assets/uploads_user_icon/' +
            req.file.filename
        )
        .toString('base64'),
    }
    const updated_data = Object.assign(req.user, new_user_icon)

    await db.sequelize.transaction({}, async () => {
      await db.User.update(updated_data, { where: { id: req.user.id } })
    })

    return updated_data
  } catch (err) {
    throw err
  }
}

// helper function

function omitHash(user) {
  const { hash, ...userWithoutHash } = user
  return userWithoutHash
}
