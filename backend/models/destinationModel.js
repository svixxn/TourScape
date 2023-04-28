const mongoose = require('mongoose')
const slugify = require('slugify');

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A destination must have a name"],
        unique: true,
        trim: true,
        maxLength: [40, "The destination name must have at most 40 characters"],
        minLength: [4, "The destination name must have at least 10 characters"]
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [30, "The destination description must have at least 30 characters"]
    },
    location: {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
    },
    tours: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour'
        }
    ],
    restaurants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Restaurant' 
        }
    ],
    hotels: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Hotel'
        }
    ]
}, {timestamps:true});

destinationSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination;