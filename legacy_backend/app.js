var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

const sharedhost = require('./routes/sharedhost')
const upload = require('./routes/upload')
const kill = require('./routes/kill')

var app = express()

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

/* Use cors and fileUpload*/
app.use(cors())
app.use(fileUpload())

app.get('/', (req, res) => {
  return res.send('Hiiiiiiii')
})
app.use('/sharedhost', sharedhost)
app.use('/upload', upload)
app.use('/kill', kill)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
