const jwt = require('express-jwt')

const db = require('src/models')
const { secret } = require('src/config/config.json')

module.exports = authorize

function authorize() {
  return [
    jwt({ secret, algorithms: ['HS256'] }),

    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.sub)
      if (!user) {
        return res.status(401).json({
          ErrorMessageJP: '認証エラー',
          ErrorMessageEN: 'Unauthorized',
        })
      }
      req.user = user.get()
      next()
    },
  ]
}
