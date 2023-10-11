const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const cors = require('cors');
const multer = require('multer');
const passport = require('passport');
const { default: mongoose } = require('mongoose')
require('dotenv').config();

const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category/router')
const supplierRouter = require('./routes/supplier/router')
const employeeRouter = require('./routes/employee/router')
const authEmployeeRouter = require('./routes/authEmployee/router')

const mediaRouter = require('./routes/uploadMedia/router');

const {
  passportVerifyToken,
  passportVerifyAccount,
  // passportConfigBasic,
} = require('./middlewares/passport');

const app = express()
const port = 9000

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use(
//   cors({
//     origin: '*',
//   }),
// );

mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`)

passport.use(passportVerifyToken);
passport.use(passportVerifyAccount);

app.use("/", indexRouter)
app.use("/categories", categoryRouter)
app.use("/suppliers", supplierRouter)
app.use("/employees", employeeRouter)
app.use("/authEmployee", authEmployeeRouter)

app.use('/media', passport.authenticate('jwt', { session: false }), mediaRouter);

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
