const mongoose = require('mongoose')
const slugify = require('slugify');
const validator = require('validator');
const User = require('./userModel');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        maxLength: [40, "The tour name must have at most 40 characters"],
        minLength: [10, "The tour name must have at least 10 characters"]
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'The tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'The tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'The tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'The tour must have a valid difficulty'
        },
    },
    ratingsAverage: {
        type: Number,
        default: 4,
        min: [1, "The rating must be above 1.0"],
        max: [5, "The rating must be below 5.0"],
        set: val => Math.round(val * 10) / 10
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (value) {
                return value < this.price;
            },
            message: "The discount price must lower the the regular price"
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A tour must have a summary"]
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    photo: [String],
    startDates: [
        {
            date: {
                type: Date
            },
            availablePlaces: {
                type: Number
            }
        }
    ],
    secretTour: {
        type: Boolean,
        default: false
    },
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            address: String,
            description: String,
            hours: Number
        }
    ],
    destination: {
        type: String,
        required: true
    },
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});


tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    });

    next();
});

tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    this.start = Date.now();
    next();
})

tourSchema.pre('save', function(next) {
    if (this.isNew) {
        this.startDates.forEach(date => {
            date.availablePlaces = this.maxGroupSize;
        });
    }
    next();
});






const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;