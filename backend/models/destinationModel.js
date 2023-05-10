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
    short_desc: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, "The destination short description must have at least 30 characters"]
    },
    photo: [
        {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        }
    ],
    location: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
        },
        coordinates: [Number],
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

destinationSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

destinationSchema.virtual('tours', {
    ref: 'Tour',
    foreignField: 'destination',
    localField: 'name'
});

destinationSchema.virtual('hotels', {
    ref: 'Hotel',
    foreignField: 'destination',
    localField: 'name'
});

destinationSchema.virtual('restaurants', {
    ref: 'Restaurant',
    foreignField: 'destination',
    localField: 'name'
});

const Destination = mongoose.model('Destination', destinationSchema)

module.exports = Destination;