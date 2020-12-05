const mongoose = require('mongoose');


const plantSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    storeID: {
        type: mongoose.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    
})

const Plant = mongoose.model('plants', plantSchema, 'plants');

module.exports = Plant;