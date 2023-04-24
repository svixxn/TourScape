const express = require('express');
const tourController = require('../controllers/tourController');
const {protect, restrictTo} = require("../middlewares/authMiddleware")
// const reviewRouter = require("../routes/reviewRoutes")

const router = express.Router()
// router.use('/:tourId/reviews', reviewRouter);


router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guides'), tourController.getMonthlyPlan);
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router.route('/').get(tourController.getAllTours).post(protect, restrictTo('admin', 'lead-guide'), tourController.createTour);
router.route('/:id').get(tourController.getTourById).patch(protect, restrictTo('admin', 'lead-guide'), tourController.uploadTourImages, tourController.resizeTourImages, tourController.updateTourById).delete(protect, restrictTo('admin', 'lead-guide'), tourController.deleteTour);


module.exports = router;
