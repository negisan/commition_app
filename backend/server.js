require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('_middleware/error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/public', require('./controllers/public.controller'))
app.use('/users', require('./controllers/users.controller'))
app.use('/', require('./controllers/auth.controller'))

app.use(errorHandler)

const port =
  process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000
app.listen(port, () => console.log('Server listenig on port ' + port))
