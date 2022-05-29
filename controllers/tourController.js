const fs = require('fs');

//READ DEV DATA
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours?.length,
    data: {
      tours,
    },
  });
};

exports.getATour = (req, res) => {
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

exports.createATour = (req, res) => {
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

exports.updateATour = (req, res) => {
  //THIS ROUTE IS NOT IMPLEMENTED YET
  res.status(200).json({
    status: 'pending',
    message: 'This route is not implemented yet',
  });
};

exports.deleteATour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
