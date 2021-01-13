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
    userId: {
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
        /*validate: {
            validator: Number.isInteger,
            message: "Stars should be expressed in integer values"
        }*/
    }
})

const Review = mongoose.model('reviews', reviewSchema, 'reviews');

module.exports = Review;