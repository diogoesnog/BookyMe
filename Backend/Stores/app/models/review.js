const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    storeID: {
        type: mongoose.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

const Review = mongoose.model('reviews', reviewSchema, 'reviews');

module.exports = Review;