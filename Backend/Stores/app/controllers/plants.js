const Plant = require('../models/plant');
const Store = require('../models/store');


module.exports.getPlant = (id) => {
    return Plant.findOne({storeID: id})
}

module.exports.removeStorePlant = (id) => {
    return Plant.deleteOne({storeID: id})
}

module.exports.insertPlant = async (plant, storeID) => {
    await Store.updateOne({_id: storeID},{$set: {hasPlant: true}})
    const newPlant = new Plant(plant);
    return newPlant.save();
}