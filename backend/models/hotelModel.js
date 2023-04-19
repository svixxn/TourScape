const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A destination must have a name"],
        unique: true,
        trim: true,
        maxLength: [40, "The destination name must have at most 40 characters"],
        minLength: [10, "The destination name must have at least 10 characters"]
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [30, "The destination description must have at least 30 characters"]
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
    }


});

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel;