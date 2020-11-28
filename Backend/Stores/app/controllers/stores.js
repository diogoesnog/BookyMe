const Store = require('../models/store');


module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.insertReview = (id, review) => {
    return Store.updateOne({_id: id},{$push: {reviews: review}});
}


module.exports.insertSchedule = (id, s) => {
    return Store
    .updateOne({_id: id},{$push: {schedule: s}})
}


module.exports.create = (store) => {
    const newStore = new Store(store);
    return newStore.save();
}