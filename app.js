const express = require('express');

const fs = require('fs');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //3RD PARTY LOGGER  MIDDLEWARE
}

app.use(express.json()); //ADDS DATA TO THE REQUEST BODY
app.use(express.static(`${__dirname}/public`)); //SERVES STATIC FILES

//CUSTOM MIDDLEWARE
// app.use((req, res, next) => {
//   //'use' and 'next' DENOTES A MIDDLEWARE
//   console.log('HELLO FROM THE MIDDLEWARE');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MOUNTING ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  //all STANDS FOR ALL THE VERBS
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
