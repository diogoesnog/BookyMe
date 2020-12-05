const Store = require('../models/store');


module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.insertReview = (id, review) => {
    return Store.updateOne({_id: id},{$push: {reviews: review}});
}


module.exports.insertSchedule = (id, s) => {    
    return Store.updateOne({_id: id, 'schedule.day': {$ne: s.day}},{$push: {schedule: s}})
    
}

module.exports.editDescription = (id, des) => {
    return Store.updateOne({_id: id},{$set: {description: des}})
}

module.exports.editPhone = (id, phone) => {
    return Store.updateOne({_id: id},{$set: {phone: phone}})
}

module.exports.editAddress = (id, add) => {
    return Store.updateOne({_id: id},{$set: {address: add}})
}

module.exports.editLogo = (id, l) => {
    return Store.updateOne({_id: id},{$set: {logo: l}})
}

module.exports.removeStore = (id) => {
    return Store.remove({_id: id})
}
module.exports.editPicture = (id, pic) => {
    return Store.updateOne({_id: id},{$set: {picture: pic}})
}

module.exports.addPhoto = (id, photos) => {
    return Store.updateOne({_id: id},{$push: {photos: photos}})
}

module.exports.setCoordinates = (lat, long, id) => {
    return Store.updateOne({_id: id},{$set: {latitude: lat, longitude: long}})
}

module.exports.removeStorePhoto = (id, pId) => {
    return Store.updateOne({_id: id},{$pull: {photos: {'_id': pId}}})
}


module.exports.create = (store) => {
    const newStore = new Store(store);
    return newStore.save();
}