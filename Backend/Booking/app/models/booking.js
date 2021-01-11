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
    wasRescheduled: {
        type: Boolean
    },
    serviceDate: {
        type: Date,
        required: true
    },
    city: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    canceled: {
        type: String,
        required: true,
        default: false
    }
});

const Booking = mongoose.model('booking', bookingSchema, 'booking');

module.exports = Booking;
