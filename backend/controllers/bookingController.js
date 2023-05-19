const Booking = require("../models/bookingModel")
const Tour = require("../models/tourModel")
const Hotel = require("../models/hotelModel")
const Restaurant = require("../models/restaurantModel")
const catchAsync = require("../utils/catchAsync")
const factory = require('../utils/handlerFactory')
const AppError = require("../utils/appError")
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.setModelUserIds = (req, res, next) => {
   if (req.params.tourId) {
      if (!req.body.tour) req.body.tour = req.params.tourId
   }
   if (req.params.hotelId) {
      if (!req.body.hotel) req.body.hotel = req.params.hotelId
   }
   if (req.params.restaurantId) {
      if (!req.body.restaurant) req.body.restaurant = req.params.restaurantId
   }
   if (!req.body.user) req.body.user = req.user.id
   next();
}


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
   const onBooking = req.body.item;

   const price = onBooking.price * req.body.numberOfPeople * 100; // Calculate the total price

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.user.email,
      success_url: `${req.protocol}://${req.get('host')}/tours`,
      cancel_url: `${req.protocol}://${req.get('host')}/tours/${onBooking.slug}`,
      line_items: [{
         price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
               name: onBooking.name,
               description: onBooking.summary,
               metadata: {
                  startDate: req.body.startDate,
                  numberOfPeople: req.body.numberOfPeople
               },
               images: [`${onBooking.photo[0]}`],
            },
         },
         quantity: 1
      }]
   });

   res.status(200).json({
      status: 'success',
      session
   });
});

exports.checkoutWebhook = catchAsync(async (req, res, next) => {
   const sig = request.headers['stripe-signature'];

   let event;

   try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
   } catch (err) {
      return next(new AppError(`Webhook error: ${err}`), 400)
   }

  if(event.type === 'checkout.session.completed'){
   console.log(event.data)
  }
})








exports.getAllBookings = factory.getAll(Booking)

exports.getBooking = factory.getOne(Booking)

exports.createBooking = factory.createOne(Booking)

exports.updateBooking = factory.updateOne(Booking)

exports.deleteBooking = factory.deleteOne(Booking)