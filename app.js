var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
mongoose.connect('mongodb://127.0.0.1/kingwell');
var app = express();
var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  rolling: false,
  saveUninitialized: true,
  store: new MongooseStore({
    connection: mongoose
      /* configuration */
  })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var api = {
  indexActivity: require('./routes/api/wxapp'),
  getUserInfo: require('./routes/api/get-user-info'),
  weixinPay: require('./routes/api/weixin-pay')
};
app.use('/', routes);
app.use('/users', users);

/**
 * api
 */
app.use('/api/wxapp', api.indexActivity);
app.use('/api/get-user-info', api.getUserInfo);
app.use('/api/pay', api.weixinPay);


var apiRouters = {
  file: require('./routes/api/file'),
};
app.use('/file/', apiRouters.file);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;