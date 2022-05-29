const express = require('express');

const fs = require('fs');

const app = express();

//MIDDLWARES
app.use(express.json()); //ADDS DATA TO THE REQUEST BODY

//READ DEV DATA
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
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

// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getATour );

// app.post('/api/v1/tours', createATour );

// app.patch('/api/v1/tours/:id', updateATour);

// app.delete('/api/v1/tours/:id', deleteATour);

//CHAINED ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createATour);
app
  .route('/api/v1/tours/:id')
  .get(getATour)
  .patch(updateATour)
  .delete(deleteATour);

const port = 8000;
app.listen(port, () => {
  console.log('server started at port', port);
});
