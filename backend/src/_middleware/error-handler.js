module.exports = errorHandler

function errorHandler(err, req, res, next) {
  console.log('err=========', err)
  switch (true) {
    case typeof err === 'string':
      return res.status(400).json({
        message: err,
      })
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
