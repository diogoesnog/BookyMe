const Store = require('../models/store');
const Plant = require ('../models/plant');
const Review = require('../models/review');
const Service = require('../services/users');

module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.getSchedule = (storeId, day) => {
    return Store.findOne({_id: storeId},{ schedule: {$elemMatch: {day: day}}})
}

module.exports.getScheduleList = async (storeId) => {

    let mongoResult = await Store.findOne({_id: storeId},{ schedule: 1})
    let data = mongoResult.schedule
    const sorter = {
        "Segunda-feira": 1,
        "Terça-feira": 2,
        "Quarta-feira": 3,
        "Quinta-feira": 4,
        "Sexta-feira": 5,
        "Sábado": 6,
        "Domingo": 7
      }
      
      const order = { "Segunda-feira": 1, "Terça-feira": 2, "Quarta-feira": 3, "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6, "Domingo": 7 };
      
      
      data.sort(function (a, b) {
          return order[a.day] - order[b.day];
      });

      console.log(data)
    return data      
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

module.exports.editAddress = async (add, id) => {
    let coordinates = await getCoordinates(add);

    return Store.findOneAndUpdate({_id: id},{$set: {
            address: add,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
    }},{new: true})
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

module.exports.removeStoreSchedule = (id, sId) => {
    return Store.findOneAndUpdate({_id: id},{$pull: {schedule: {'_id': sId}}}, { new: true } )
}


module.exports.create = async (store) => {
    let coordinates = await getCoordinates(store.address);

    store["latitude"] = coordinates.latitude;
    store["longitude"] = coordinates.longitude;
    const newStore = new Store(store);
    return newStore.save();
}

async function getCoordinates(address) {
    try {
        let response = await Service.getCoordinates(address)

        let data = response.data["data"];
        console.log(response.data);

        if (data.length === 1) {
            return {
                latitude: data[0].latitude,
                longitude: data[0].longitude
            }
        }
        return {latitude: 0, longitude: 0}
    } catch (e) {
        console.log(e);
        return {latitude: 0, longitude: 0}
    }
}

/*
 * Find Stores by Array of Values
 */
module.exports.findByArrayId = (array) => Store.find({ _id: { $in: array }});
