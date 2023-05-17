const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour'
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel'
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: 'Restaurant'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  onDate: {
    type:Date,
    require: true
  },
  numberOfPeople: {
    type: Number,
    require: true
  }
}, { timestamps: true });

bookingSchema.pre(/^find/, function (next) {
  if (this.tour) this.populate({
    path: 'tour',
    select: 'name photo'
  });
  else if (this.hotel) this.populate({
    path: 'hotel',
    select: 'name photo'
  });
  else this.populate({
    path: 'restaurant',
    select: 'name photo'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
