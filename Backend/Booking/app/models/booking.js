const mongoose = require('mongoose');

const catalog = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true,
        auto: false
    },
    product: {
        type: String
    },
    price: {
        type: Number
    },
    abstract: {
        type: String
    },
});

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
    storeName: {
        type: String,
        required: true
    },
    mainStorePhotoURL: {
        type: String
    },
    slotId: {
        type: String,
        required: true
    },
    hasCatalog: {
        type: Boolean,
        required: true
    },
    service: {
        type: catalog,
        required: false
    },
    canceled: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Booking = mongoose.model('booking', bookingSchema, 'booking');

module.exports = Booking;
