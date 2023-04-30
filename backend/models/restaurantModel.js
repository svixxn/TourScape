const mongoose = require('mongoose');
const slugify = require('slugify');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'Restaurant must have a Tour!']
  },
  slug: String,
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
}, { 
  timestamps: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true} 
});

restaurantSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'restaurant',
  localField: '_id'
});

restaurantSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
