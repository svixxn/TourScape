const Booking = require("../models/bookingModel")
const catchAsync = require("../utils/catchAsync")
const factory = require('../utils/handlerFactory')

exports.setModelUserIds = (req, res, next) => {
   if(req.params.tourId){
      if(!req.body.tour) req.body.tour = req.params.tourId
   }
   if(req.params.hotelId){
      if(!req.body.hotel) req.body.hotel = req.params.hotelId
   }
   if(req.params.restaurantId){
      if(!req.body.restaurant) req.body.restaurant = req.params.restaurantId
   }
    if(!req.body.user) req.body.user = req.user.id
    next();
}
// TODO: add a myBookings
// exports.getMy = catchAsync(async (req,res,next) => {
//    const myBookings = await Booking.fi
// })

exports.getAllBookings = factory.getAll(Booking)

exports.getBooking = factory.getOne(Booking)

exports.createBooking = factory.createOne(Booking)

exports.updateBooking = factory.updateOne(Booking)

exports.deleteBooking = factory.deleteOne(Booking)