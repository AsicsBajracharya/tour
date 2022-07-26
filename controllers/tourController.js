// const fs = require('fs');

const Tour = require('../Models/tourModel');

//READ DEV DATA
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

//ROUTE HANDLERS

exports.checkID = (req, res, next, val) => {
  console.log('param middleware ran');
  // if (val > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  next();
};

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Tour name or Tour price is missing',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours?.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getATour = (req, res) => {
  // '?' FOR OPTIONAL PARAMS
  // console.log(req.params);
  // const tour = tours.filter((el) => el.id == req.params.id);
  // res.status(200).json({
  //   status: 'success',
  //   results: tours?.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createATour = async (req, res) => {
  // console.log(req.body);
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
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
