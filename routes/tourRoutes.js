const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

//RUNS ONLY WHENE SPECIFIC PARAMATERS ARE PASSED
// router.param('id', tourController.checkID);

// //MOUNTING ROUTER
// app.use('/api/v1/tours', router);

//CHAINED TOUR ROUTES

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createATour);
router
  .route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateATour)
  .delete(tourController.deleteATour);

module.exports = router;
