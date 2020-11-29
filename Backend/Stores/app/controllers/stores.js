const Store = require('../models/store');


module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.insertReview = (id, review) => {
    return Store.updateOne({_id: id},{$push: {reviews: review}});
}


module.exports.insertSchedule = (id, s) => {
    return Store.updateOne({_id: id},{$push: {schedule: s}})
}

module.exports.editDescription = (id, des) => {
    return Store.updateOne({_id: id},{$set: {description: des}},{upsert: true})
}

module.exports.editAddress = (id, add) => {
    return Store.updateOne({_id: id},{$set: {address: add}},{upsert: true})
}

module.exports.editLogo = (id, l) => {
    return Store.updateOne({_id: id},{$set: {logo: l}},{upsert: true})
}

module.exports.removeStore = (id) => {
    return Store.remove({_id: id})
}

module.exports.addPhoto = (id, photo) => {
    return Store.updateOne({_id: id},{$push: {photos: photo}})
}

module.exports.create = (store) => {
    const newStore = new Store(store);
    return newStore.save();
}