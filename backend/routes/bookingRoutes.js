const express = require("express");
const bookingController = require('./../controllers/bookingController');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router({mergeParams:true});

router.use(authMiddleware.protect)

router.get('/booking-stats',authMiddleware.restrictTo('admin', 'lead-guide'),bookingController.getBookingStats);
router.get('/',authMiddleware.restrictTo('admin', 'lead-guide'), bookingController.getAllBookings)
router.get('/my', bookingController.getMyBookings)

router.post('/checkout-session', authMiddleware.restrictTo('user'), bookingController.getCheckoutSession)


router.post('/', authMiddleware.restrictTo('user'), bookingController.setModelUserIds, bookingController.createBooking)
router.route('/:id').delete(authMiddleware.restrictTo('user', 'admin'), bookingController.deleteBooking).patch(authMiddleware.restrictTo('user', 'admin'), bookingController.updateBooking).get(bookingController.getBooking)



module.exports = router;