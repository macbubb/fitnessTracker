var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const connectDB = require('./db/conn');

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/userRoutes');
var exerciseRoutes = require('./routes/exerciseRoutes');
var logRoutes = require('./routes/logRoutes');

connectDB();

var app = express();
var corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', userRoutes);
app.use('/api/users/:id/exercises', exerciseRoutes);
app.use('/api/users/:id/logs', logRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`<h1>error: ${err.message}</h1>`);
});

module.exports = app;
