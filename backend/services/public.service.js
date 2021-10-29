const db = require('models')

module.exports = {
  getUser,
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
