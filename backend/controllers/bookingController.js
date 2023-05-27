const Booking = require("../models/bookingModel")
const Tour = require("../models/tourModel")
const Hotel = require("../models/hotelModel")
const Restaurant = require("../models/restaurantModel")
const catchAsync = require("../utils/catchAsync")
const factory = require('../utils/handlerFactory')
const AppError = require("../utils/appError")
const User = require("../models/userModel")
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
   const { item, numberOfPeople, startDate } = req.body;
   const { price, name, summary, photo, slug } = item;

   const successURL = `${req.protocol}://${req.get('host')}/tours`;
   const cancelURL = `${req.protocol}://${req.get('host')}/tours/${slug}`;

   const images = photo.map(photo => String(photo));
   const unitAmount = price * numberOfPeople * 100;

   const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.user.email,
      success_url: successURL,
      client_reference_id: item._id,
      cancel_url: cancelURL,
      line_items: [{
         price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
               name,
               description: summary,
               images,
            },
         },
         quantity: 1,
      }],
      metadata: {
         startDate,
         numberOfPeople
      }
   });

   res.status(200).json({
      status: 'success',
      session
   });
});


exports.checkoutWebhook = catchAsync(async (req, res, next) => {
   const sig = req.headers['stripe-signature'];
   console.log(sig)
   console.log(process.env.STRIPE_SECRET_WEBHOOK)
   
 
   try {
     const event = stripe.webhooks.constructEvent(
       req.body,
       sig,
       process.env.STRIPE_SECRET_WEBHOOK
     );

     console.log(event)
     
     if (event.type === 'checkout.session.completed') {
      console.log("COMPLETED!")
       const session = event.data.object;

 
       const { client_reference_id, metadata, customer_email, amount_total } = session;
 
       const { startDate, numberOfPeople } = metadata; 

       const user = await User.findOne({email: customer_email})
       const newStartDate = new Date(startDate).toISOString();

       await Booking.create({
         tour: client_reference_id,
         user: user._id, 
         price: amount_total / 100, 
         onDate:newStartDate,
         numberOfPeople
       });
     }
   } catch (err) {
     return next(new AppError(`Webhook error: ${err}`, 400)); 
   }
 
   res.status(200).json({ received: true });
 });
 









exports.getAllBookings = factory.getAll(Booking)

exports.getBooking = factory.getOne(Booking)

exports.createBooking = factory.createOne(Booking)

exports.updateBooking = factory.updateOne(Booking)

exports.deleteBooking = factory.deleteOne(Booking)