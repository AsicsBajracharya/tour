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

exports.getAllTours = async (req, res) => {
  try {
    // console.log(req.query); //RETURNS THE QUERY OBJECT
    //1A FILTERING
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //EXCLUDING SPECIFIC KEYWORDS
    excludedFields.forEach((el) => delete queryObj[el]);

    //AB ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr)); //CREATING QUERY
    //2 SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); //FOR SORTING MULTIPLE PROPERTIES
      console.log(sortBy);
      query = query.sort(sortBy);
      //sort('price ratingAverage')
    } else {
      query = query.sort('-createdAt');
    }
    //{difficulty: 'easy, duration: {$gte: 5}}
    //OPERATORS TO BE EXCLUDED gte, gt, lte,lt

    //EXECUTE QUERY
    const tours = await query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours?.length,
      data: {
        tours,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
};

exports.getATour = async (req, res) => {
  console.log(req.params, 'params');
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
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

exports.updateATour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.deleteATour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
};
