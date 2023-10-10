const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const { default: mongoose } = require('mongoose')
require('dotenv').config();
const categoryRouter = require('./routes/category/router')
// const { Category } = require('./models');

const app = express()
const port = 9000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`)
// mongoose.connect("mongodb+srv://piorentina:aspirine12@cluster0.ayixjtb.mongodb.net/batch31-nodejs-database")

app.use("/categories", categoryRouter)

app.listen(port, () => {
  console.log(`Starting on port ${port}`)
})

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
  res.render('error');
});

module.exports = app;