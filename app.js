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
app.use((req, res, next) => {
  //'use' and 'next' DENOTES A MIDDLEWARE
  console.log('HELLO FROM THE MIDDLEWARE');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MOUNTING ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
