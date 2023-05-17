const express = require("express");
const bookingController = require('./../controllers/bookingController');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router({mergeParams:true});

router.use(authMiddleware.protect)


router.post('/', authMiddleware.restrictTo('user'), bookingController.setModelUserIds, bookingController.createBooking)
router.route('/:id').delete(authMiddleware.restrictTo('user', 'admin'), bookingController.deleteBooking).patch(authMiddleware.restrictTo('user', 'admin'), bookingController.updateBooking).get(bookingController.getBooking)
router.get('/my', )

router.use(authMiddleware.restrictTo('admin', 'lead-guide'))
router.get('/', bookingController.getAllBookings)


module.exports = router;