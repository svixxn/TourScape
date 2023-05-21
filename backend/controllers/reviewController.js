const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('../utils/handlerFactory');

exports.setModelUserIds = (req, res, next) => {
   if (req.params.tourId) {
      if (!req.body.tour) req.body.tour = req.params.tourId
      req.body.modelReview = "tour";
   }
   if (req.params.hotelId) {
      if (!req.body.hotel) req.body.hotel = req.params.hotelId
      req.body.modelReview = "hotel";
   }
   if (req.params.restaurantId) {
      if (!req.body.restaurant) req.body.restaurant = req.params.restaurantId
      req.body.modelReview = "restaurant";
   }
   if (!req.body.user) req.body.user = req.user.id

   next();
}

exports.isReviewExisted = catchAsync(async (req, res, next) => {
   let existed = undefined;
   switch (req.body.modelReview) {
      case "tour":
         existed = await Review.findOne({ user: req.body.user, tour: req.body.tour })
         break;
      case "hotel":
         existed = await Review.findOne({ user: req.body.user, tour: req.body.hotel })
         break;
      case "restaurant":
         existed = await Review.findOne({ user: req.body.user, restaurant: req.body.restaurant })
         break;
      default:
         existed = null;
         break;
   }
   req.body.modelReview = undefined
   if (existed) return next(new AppError('You have already added review.', 400))
   next()

})

exports.getAllReviews = factory.getAll(Review)

exports.getReview = factory.getOne(Review)

exports.createReview = factory.createOne(Review)

exports.updateReview = factory.updateOne(Review)

exports.deleteReview = factory.deleteOne(Review)

exports.deleteAllReviews = factory.deleteAll(Review)
