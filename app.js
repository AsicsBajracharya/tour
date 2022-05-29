const express = require('express');

const fs = require('fs');

const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//MIDDLWARES
app.use(morgan('dev'));
app.use(express.json()); //ADDS DATA TO THE REQUEST BODY

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
