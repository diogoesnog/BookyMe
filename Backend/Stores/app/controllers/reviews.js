const Review = require('../models/review');
const Store = require ('../models/store')

module.exports.getReview = (id) => {
    return Review.find({storeID: id});
}


module.exports.insertReview = async (review) => {
    
    
    reviews = await Review.find({storeID: review.storeID})    
    tamanho = reviews.length
    sum = 0
    if(tamanho > 0){
        i = 0
        while(i<tamanho){
            sum += reviews[i].rating
            i++
        }
        soma = Number(sum) + Number(review.rating)
        tamanhoTotal = tamanho + 1
        newStoreRating = (soma / tamanhoTotal)
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