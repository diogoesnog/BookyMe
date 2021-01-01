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
    day: {
        type: String,
        enum: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira','Sexta-feira','Sábado','Domingo']
    },
    openingHour: {
        type: String
    },
    closingHour: {
        type: String
    }
})

const address = new mongoose.Schema({
    place: {
        type: String
    },
    zipcode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
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
        enum: ['Restaurante', 'Cabeleireiro', 'Spa', 'Estética', 'Ginásio','Clínica','Clínica Dentária','Clínica Veterinária','Loja de Animais','Sapataria','Vestuário','Comércio Tradicional','Instrumentos Músicais'],
        required: true
    },

    hasPlant: {
        type: Boolean,
        required: true,
        default: false
    },

    schedule: [schedule],

    address: address,

    latitude: {
        type: Number,
        default: 0.000000
    },

    longitude: {
        type: Number,
        default: 0.000000
    },

    rating: {
        type: Number,
        default: 0
    },

    phone: {
        type: Number
    },

    picture: image,

    photos: [image]


});


const Store = mongoose.model('stores', storeSchema, 'stores');

module.exports = Store;