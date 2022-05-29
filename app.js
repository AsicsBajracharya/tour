const express = require('express');

const fs = require('fs');

const morgan = require('morgan');

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

//READ DEV DATA
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours?.length,
    data: {
      tours,
    },
  });
};

const getATour = (req, res) => {
  // '?' FOR OPTIONAL PARAMS
  // console.log(req.params);
  const tour = tours.filter((el) => el.id == req.params.id);
  if (req.params.id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }
  res.status(200).json({
    status: 'success',
    results: tours?.length,
    data: {
      tour,
    },
  });
};

const createATour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        message: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const updateATour = (req, res) => {
  //THIS ROUTE IS NOT IMPLEMENTED YET
  res.status(200).json({
    status: 'pending',
    message: 'This route is not implemented yet',
  });
};

const deleteATour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//USER ROUTE HANDLERS

const getAllusers = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not implemented yet',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not implemented yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not implemented yet',
  });
};
const udpateUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not implemented yet',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'This route is not implemented yet',
  });
};

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getATour );

// app.post('/api/v1/tours', createATour );

// app.patch('/api/v1/tours/:id', updateATour);

// app.delete('/api/v1/tours/:id', deleteATour);

//ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

//MOUNTING ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//CHAINED TOUR ROUTES
tourRouter.route('/').get(getAllTours).post(createATour);
tourRouter.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

//CHAINED USER ROUTES

userRouter.route('/').get(getAllusers).post(createUser);
userRouter.route('/:id').get(getUser).patch(udpateUser).delete(deleteUser);

//SERVER
const port = 8000;
app.listen(port, () => {
  console.log('server started at port', port);
});
