const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number
    }
}, {timestamps: true});

/*paymentSchema.pre(/^find/, function(next) {
    this.populate('user').populate({
        path: 'tour',
        select: 'name'
    });
    next();
});*/

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
