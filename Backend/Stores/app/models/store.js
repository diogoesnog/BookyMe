const mongoose = require('mongoose');

const image = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
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
    }
})


const schedule = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    day: {
        type: String
    },
    openingHour: {
        type: String
    },
    closingHour: {
        type: String
    }
})



const storeSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true,
        auto: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    logo: {
        type: image
    },

    description: {
        type: String,
    },

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    hasPlant: {
        type: Boolean,
        required: true,
        default: false
    },

    schedule: [schedule],

    address: {
        type: String,
        required: true
    },

    latitude: {
        type: Number,
        default: 0.000000
    },

    longitude: {
        type: Number,
        default: 0.000000
    },

    rating: {
        type: Number
    },

    picture: image,

    photos: [image]


});

const Store = mongoose.model('stores', storeSchema, 'stores');

module.exports = Store;