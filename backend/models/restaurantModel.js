const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Restaurant must have a Tour!']
  },
  description: {
    type: String,
    required: [true, 'Restaurant must have a description!']
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
  },
  services: [
    {
      type: String,
    }
  ],
  destination: {
    type: String,
    required: true
  },
}, { timestamps: true });


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
