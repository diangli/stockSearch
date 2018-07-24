var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api_stock = require('./routes/api_stock');//get the object that exported from api_stock module
var stock_SMA = require('./routes/stock_SMA');
var stock_EMA = require('./routes/stock_EMA');
var stock_RSI = require('./routes/stock_RSI');
var stock_ADX = require('./routes/stock_ADX');
var stock_CCI = require('./routes/stock_CCI');
var stock_STOCH = require('./routes/stock_STOCH');
var stock_BBANDS = require('./routes/stock_BBANDS');
var stock_MACD = require('./routes/stock_MACD');
var stock_news = require('./routes/stock_news')
var app = express();//用express框架构造方法来生成express实例

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/stock', api_stock);
app.use('/stock/SMA', stock_SMA);
app.use('/stock/EMA', stock_EMA);
app.use('/stock/RSI', stock_RSI);
app.use('/stock/ADX', stock_ADX);
app.use('/stock/CCI', stock_CCI);
app.use('/stock/STOCH', stock_STOCH);
app.use('/stock/BBANDS', stock_BBANDS);
app.use('/stock/MACD', stock_MACD);
app.use('/stock/news', stock_news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  //console.log("Example app listening at http://%s:%s", host, port)
});
