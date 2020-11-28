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

const catalogSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    storeID: {
        type: mongoose.ObjectId,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    abstract: {
        type: String
    },
    image: {
        type: image
    }
 
 });
 
 const Catalog = mongoose.model('catalogs', catalogSchema, 'catalogs');

 module.exports = Catalog;