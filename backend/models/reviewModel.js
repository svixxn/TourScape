const mongoose = require('mongoose');
const Tour = require('./tourModel');


const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty!']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
        },
        hotel: {
            type: mongoose.Schema.ObjectId,
            ref: 'Hotel',
        },
        restaurant: {
            type: mongoose.Schema.ObjectId,
            ref: 'Restaurant',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user']
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name photo'
    });
    next();
})

reviewSchema.statics.calcAverageRatings = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingQuantity: 0,
            ratingsAverage: 4
        });
    }
};

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.tour);
});

reviewSchema.post(/^findOneAnd/, function (doc, next) {
    doc.constructor.calcAverageRatings(doc.tour);
    next();
});


reviewSchema.pre('deleteMany', async function (next) {
    try {
        await Tour.updateMany({}, { ratingQuantity: 0, ratingsAverage: 4 })
        next();
    }
    catch (err) {
        console.log(err)
    }
});














const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
