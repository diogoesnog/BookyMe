const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingDate: {
        type: Date,
        required: true
    },
    serviceDate: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    storeId: {
        type: mongoose.ObjectId,
        required: true
    }
});

const Booking = mongoose.model('booking', bookingSchema, 'booking');

module.exports = Booking;