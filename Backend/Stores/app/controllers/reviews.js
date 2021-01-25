const Review = require('../models/review');
const Store = require ('../models/store')
const mongoose = require('mongoose');
const Service = require('../services/users');

module.exports.getReviews = (id) => {
    return Review.find({storeID: id}).lean();
}

module.exports.getReviewsQuery = (query) => {
    return Review.find(query);
}


module.exports.getRatings = (id) => {
    return Review.aggregate([
        { $match: {storeID: mongoose.Types.ObjectId(id)} },
        { $group: {
            _id: "$rating",
            count: {
                $sum: 1
            },
            rating: {
                $first: "$rating"
            }
        }}
    ]).exec()
}

module.exports.insertReview = async (review) => {
    
    
    let reviews = await Review.find({storeID: review.storeID});
    let tamanho = reviews.length;
    let sum = 0;
    if(tamanho > 0){
        i = 0
        while(i<tamanho){
            sum += reviews[i].rating
            i++
        }
        let soma = Number(sum) + Number(review.rating);
        let tamanhoTotal = tamanho + 1;
        let newStoreRating = Math.round((soma / tamanhoTotal) * 10) / 10 //rounded up number
        Store.updateOne({_id: review.storeID},{$set: {rating: newStoreRating}}).exec()
    }
    else {
        Store.updateOne({_id: review.storeID},{$set: {rating: review.rating}}).exec()
    }
    const newReview = new Review(review);
    return newReview.save();
}

module.exports.removeStoreReviews = (id) => {
    return Review.deleteMany({storeID: id})
}

module.exports.removeReview = (id) => {
    return Review.deleteOne({_id: id})
}

module.exports.mergeByUserId = async (reviews) => {
    let id = reviews.map(function(review){ return review.userId; });
    console.log(id);
    try {
        let response = await Service.getUsersById(id);
        let users = response.data[ "data" ]


        return mergeById(reviews, users);
    } catch(err) {
        return [];
    }
}

const mergeById = (reviews, users) => {
    return users.map(user => ({
        ...reviews.find((review) => (user._id === review.userId) && reviews),
        user: {
            ...user
        }
    }));
};