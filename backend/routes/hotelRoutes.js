const express = require('express');
const hotelController = require('../controllers/hotelController');
const {protect, restrictTo} = require("../middlewares/authMiddleware")
const reviewRouter = require("../routes/reviewRoutes")

const router = express.Router()
router.use('/:hotelId/reviews', reviewRouter);

router.get('/', hotelController.getAllHotels)
router.get('/:id', hotelController.getHotel)

router.use(protect)
router.use(restrictTo('admin', 'lead-guide'))

router.post('/', hotelController.createHotel)
router.patch('/:id', hotelController.updateHotel)
router.delete('/:id', hotelController.deleteHotel)

module.exports = router

