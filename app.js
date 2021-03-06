const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const cors = require('cors')

const config = require('./config')
const auth = require('./routes/session')
const apiV1 = require('./routes/v1/index')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(cors({ origin: config.options }))

app.use('/api', auth)
app.use('/api/v1', apiV1)

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500).send(err.message)
})

module.exports = app
