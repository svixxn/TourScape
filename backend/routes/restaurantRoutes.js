const express = require('express');
const restaurantController = require('../controllers/restaurantController');
const {protect, restrictTo} = require("../middlewares/authMiddleware")
const reviewRouter = require("../routes/reviewRoutes")
const bookingRouter = require("../routes/bookingRoutes")

const router = express.Router()
router.use('/:restaurantId/reviews', reviewRouter);
router.use('/:restaurantId/bookings', bookingRouter);

router.get('/', restaurantController.getAllRestaurants)
router.get('/:id', restaurantController.getRestaurant)

router.use(protect)
router.use(restrictTo('admin', 'lead-guide'))

router.post('/', restaurantController.createRestaurant)
router.patch('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router

