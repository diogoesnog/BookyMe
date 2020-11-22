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
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    }
})

const catalog = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    image: {
        type: image
    }
 
 });

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

const day = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    openingHour: {
        type: Number
    },
    closingHour: {
        type: Number
    }
})


const review = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    data: {
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

    horario: {
        type: [day],
        required: true
    },

    address: {
        type: String,
        required: true
    },

    reviews: {
        type: [review]
    },

    catalog: {
        type: [catalog]
    }

});

const Store = mongoose.model('stores', storeSchema, 'stores');

module.exports = Store;