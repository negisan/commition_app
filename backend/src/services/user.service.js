const fs = require('fs')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('src/models')
const secret = process.env.JWT_SECRET

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
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' })
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
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' })
    return { token, name: user.name }
  } catch (err) {
    throw err
  }
}

async function show(req) {
  const userAttachedIcon = Object.assign(req.user, {
    icon: fs.readFileSync(req.user.icon).toString('base64'),
  })
  return userAttachedIcon
}

async function update(user, data, update_type) {
  try {
    if (update_type === 'accepting_order') {
      let updated_user = {}
      await db.sequelize.transaction({}, async () => {
        updated_user = await db.User.findOne({ where: { id: user.id } }).then(
          (user) => {
            user.accepting_order = data.accepting_order
            user.save()
            return user
          }
        )
      })
      updated_user = Object.assign(updated_user, {
        icon: fs.readFileSync(updated_user.icon).toString('base64'),
      })
      return updated_user
    }
    if (update_type === 'default_order_price') {
      let updated_user = {}
      await db.sequelize.transaction({}, async () => {
        updated_user = await db.User.findOne({ where: { id: user.id } }).then(
          (user) => {
            user.default_order_price = data.default_order_price
            user.save()
            return user
          }
        )
      })
      updated_user = Object.assign(updated_user, {
        icon: fs.readFileSync(updated_user.icon).toString('base64'),
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
      icon:
        __basedir +
        '/resources/static/assets/uploads_user_icon/' +
        req.file.filename,
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
