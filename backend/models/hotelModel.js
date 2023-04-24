const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A hotel must have a name"],
        unique: true,
        trim: true,
        maxLength: [40, "The hotel name must have at most 40 characters"],
        minLength: [10, "The hotel name must have at least 10 characters"]
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [30, "The hotel description must have at least 30 characters"]
    },
    room_types: [
        {
            type: String,
            default: 'Standard'
        }
    ],
    location: {
        type: String,
        trim: true,
        required: true
    },
    destinations: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Destination'
        }
    ],
    slug:  String
});


hotelSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'hotel',
    localField: '_id'
});

hotelSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;