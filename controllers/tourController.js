// const fs = require('fs');

const Tour = require('../Models/tourModel');

const APIFeatures = require('../utils/apiFeatures');

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

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';

  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate();
    const tours = await features.query;
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          numTourStarts: -1,
        },
      },
      {
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      length: plan.length,
      data: plan,
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: e,
    });
  }
};
