const Store = require('../models/store');
const Plant = require ('../models/plant')
const Review = require('../models/review')

module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.getSchedule = (storeId, day) => {
    return Store.findOne({_id: storeId},{ schedule: {$elemMatch: {day: day}}})
}

module.exports.getStore = (id) => {
    return Store.findOne({_id: id});
}

module.exports.getBestStores = (cat) => {
    if(cat != undefined){
        return Store.find({category: cat}).sort({rating: -1}).limit(10);
    }
    else return Store.find().sort({rating: -1}).limit(10);
}


module.exports.getCategoryRatings = (cat) => {
    return Store.find({category: cat}).sort({rating: -1}).exec();
}

module.exports.getCategoriesResults = () => {
    return Store.aggregate([
        {
            '$group': {
                '_id': '$category',
                'count': {
                    '$sum': 1
                }
            }
        }, {
            '$addFields': {
                'title': '$_id'
            }
        }, {
            '$project': {
                '_id': false
            }
        }
    ])
}

module.exports.getResults = (query,term) => {

    if(term){
        query["$or"] = [
            { name: { '$regex': term, '$options': 'i' } },
            { description: { '$regex': term, '$options': 'i' } },
            { category: { '$regex': term, '$options': 'i' } },
            { "address.city": { '$regex': term, '$options': 'i' } }
        ]
    }
    return Store.find(query)
}

module.exports.getCategories = async () => {
    return await Store.schema.path('category').enumValues
    
}

module.exports.getCalendar = async () => {
    return await Store.schema.path('schedule').schema.path('day').enumValues
}

module.exports.getRecommended = async () => {
    return Store.find().sort({category: -1})   
    
}

module.exports.insertSchedule = (id, s) => {    
    return Store.updateOne({_id: id, 'schedule.day': {$ne: s.day}},{$push: {schedule: s}, $set:{verified: true}})
    
}

module.exports.editDescription = (id, des) => {
    return Store.findOneAndUpdate({_id: id},{$set: {description: des}}, { new: true })
}

module.exports.editPhone = (phone, id) => {
    return Store.findOneAndUpdate({_id: id},{$set: {phone: phone}}, { new: true } )
}

module.exports.editLogo = (id, l) => {
    return Store.findOneAndUpdate({_id: id},{$set: {logo: l}}, { new: true })
}

module.exports.removeStore = async (id) => {
    await Review.remove({storeID: id})
    await Plant.remove({storeID: id})
    return Store.remove({_id: id})
}
module.exports.editPicture = (id, pic) => {
    return Store.findOneAndUpdate({_id: id},{$set: {picture: pic}}, { new: true } )
}

module.exports.addPhoto = (id, photo) => {
    return Store.findOneAndUpdate({_id: id}, {$push: {photos: photo}} , {new: true});
}

module.exports.setCoordinates = (lat, long, id) => {
    return Store.findOneAndUpdate({_id: id},{$set: {latitude: lat, longitude: long}}, { new: true } )
}

module.exports.removeStorePhoto = (id, pId) => {
    return Store.findOneAndUpdate({_id: id},{$pull: {photos: {'_id': pId}}}, { new: true } )
}


module.exports.create = (store) => {
    const newStore = new Store(store);
    return newStore.save();
}


/*
 * Find Stores by Array of Values
 */
module.exports.findByArrayId = (array) => Store.find({ _id: { $in: array }});
