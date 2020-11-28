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
    script: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
})


const plant = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    floor: {
        type: Number,
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


const review = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
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

    images: [image],

    hasPlant: {
        type: Boolean,
        required: true,
        default: false
    },

    plants: [plant],

    schedule: [schedule],

    address: {
        type: String,
        required: true
    },

    reviews: {
        type: [review]
    },


});

const Store = mongoose.model('stores', storeSchema, 'stores');

module.exports = Store;