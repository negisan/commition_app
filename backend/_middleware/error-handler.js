module.exports = errorHandler

function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === 'string':
      const is404 = err.toLowerCase().endWith('not found')
      const statusCode = is404 ? 404 : 400
      if (is404) {
        return res.status(statusCode).json({
          ErrorMessageJP: 'ページが見つかりません',
          ErrorMessageEN: 'Error occured at server',
        })
      } else {
        return res.status(statusCode).json({
          message: err,
        })
      }
    case err.name === 'UnauthorizedError':
      return res.status(401).json({
        ErrorMessageJP: '認証エラー',
        ErrorMessageEN: 'Unautorized',
      })
    default:
      return res.status(500).json({
        ErrorMessageJP: 'サーバーでエラーが発生しました。',
        ErrorMessageEN: 'Error occured at server',
      })
  }
}
