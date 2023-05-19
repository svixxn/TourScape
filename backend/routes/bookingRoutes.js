const express = require("express");
const bookingController = require('./../controllers/bookingController');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router({mergeParams:true});

router.use(authMiddleware.protect)

router.get('/', bookingController.getAllBookings)
router.post('/checkout-session', bookingController.getCheckoutSession)

router.post('/', authMiddleware.restrictTo('user'), bookingController.setModelUserIds, bookingController.createBooking)
router.route('/:id').delete(authMiddleware.restrictTo('user', 'admin'), bookingController.deleteBooking).patch(authMiddleware.restrictTo('user', 'admin'), bookingController.updateBooking).get(bookingController.getBooking)
// router.get('/my', )

router.use(authMiddleware.restrictTo('admin', 'lead-guide'))


module.exports = router;