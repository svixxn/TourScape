const Review = require('../models/reviewModel')
const factory = require('../utils/handlerFactory');

exports.setModelUserIds = (req, res, next) => {
   if(req.params.tourId){
      if(!req.body.tour) req.body.tour = req.params.tourId
      req.body.modelReview = "tour";
   }
   if(req.params.hotelId){
      if(!req.body.hotel) req.body.hotel = req.params.hotelId
      req.body.modelReview = "hotel";
   }
   if(req.params.restaurantId){
      if(!req.body.restaurant) req.body.restaurant = req.params.restaurantId
      req.body.modelReview = "restaurant";
   }
    if(!req.body.user) req.body.user = req.user.id

    next();
}

exports.getAllReviews = factory.getAll(Review, {path:'reviews'})

exports.getReview = factory.getOne(Review)

exports.createReview = factory.createOne(Review)

exports.updateReview = factory.updateOne(Review)

exports.deleteReview = factory.deleteOne(Review)
