const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true,
        auto: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('booking', bookingSchema, 'booking');

module.exports = Booking;