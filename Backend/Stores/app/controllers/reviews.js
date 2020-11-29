const Review = require('../models/review');

module.exports.getReview = (id) => {
    return Review.findAll({storeID: id});
}

module.exports.insertReview = (review) => {
    const newReview = new Review(review);
    return newReview.save();
}

module.exports.removeStoreReviews = (id) => {
    return Review.deleteMany({storeID: id})
}

module.exports.removeReview = (id) => {
    return Review.deleteOne({_id: id})
}