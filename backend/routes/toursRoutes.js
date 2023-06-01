const express = require('express');
const tourController = require('../controllers/tourController');
const {protect, restrictTo} = require("../middlewares/authMiddleware")
const reviewRouter = require("../routes/reviewRoutes")
const bookingRouter = require("../routes/bookingRoutes")

const router = express.Router()
router.use('/:tourId/reviews', reviewRouter);
router.use('/:tourId/bookings', bookingRouter);


router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(protect, restrictTo('admin', 'lead-guide'),tourController.getTourStats);
router.route('/monthly-plan/:year').get(protect, restrictTo('admin', 'lead-guide', 'guide'), tourController.getMonthlyPlan);
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)
router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router.patch('/updateAllStartDates', protect, restrictTo('admin'), tourController.updateAllStartDates)
router.route('/').get(tourController.getAllTours).post(protect, restrictTo('admin', 'lead-guide'), tourController.createTour);
router.get('/:slug',tourController.getTourById)
router.route('/:id').patch(protect, restrictTo('admin', 'lead-guide'), tourController.uploadTourPhoto, tourController.updateTourById).delete(protect, restrictTo('admin', 'lead-guide'), tourController.deleteTour);

// router.route('/:id').get(tourController.getTourById).patch(protect, restrictTo('admin', 'lead-guide'), tourController.uploadTourCover, tourController.resizeTourImages, tourController.updateTourById).delete(protect, restrictTo('admin', 'lead-guide'), tourController.deleteTour);


module.exports = router;

