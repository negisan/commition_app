const fs = require('fs')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('src/models')
const config = require('src/config/config.json')

module.exports = {
  authenticate,
  create,
  show,
  update,
  updateUserIcon,
}

async function authenticate({ email, password }) {
  const user = await db.User.scope('withHash').findOne({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.hash))) {
    throw 'パスワードが間違っています'
  }
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' })
  return { token, name: user.name }
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

async function update(user, data, update_type) {
  try {
    if (update_type === 'accepting_order') {
      const updated_user = await db.sequelize.transaction({}, async () => {
        await db.User.findOne({ where: { id: user.id } }).then((user) => {
          user.accepting_order = data.accepting_order
          user.save()
        })
      })
      return updated_user
    }
    if (update_type === 'default_order_price') {
      const updated_user = await db.sequelize.transaction({}, async () => {
        await db.User.findOne({ where: { id: user.id } }).then((user) => {
          user.default_order_price = data.default_order_price
          user.save()
        })
      })
      return updated_user
    }
    throw `no match ${update_type} - update_type`
  } catch (err) {
    throw err
  }
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
