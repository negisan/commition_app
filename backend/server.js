require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('src/_middleware/error-handler')

global.__basedir = __dirname

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.use('/public', require('./src/controllers/public.controller'))
app.use('/users', require('./src/controllers/users.controller'))
app.use('/', require('./src/controllers/auth.controller'))

app.use(errorHandler)

const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000
app.listen(port, () => console.log('Server listenig on port ' + port))
