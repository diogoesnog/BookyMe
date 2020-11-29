const Plant = require('../models/plant');

module.exports.getPlant = (id) => {
    return Plant.findOne({storeID: id})
}

module.exports.removeStorePlant = (id) => {
    return Plant.deleteOne({storeID: id})
}

module.exports.insertPlant = (plant) => {
    const newPlant = new Plant(plant);
    return newPlant.save();
}