const mongoose = require('mongoose');


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
        type: String
    },
    price: {
        type: String
    },
    abstract: {
        type: String
    },
 
 });
 
 const Catalog = mongoose.model('catalogs', catalogSchema, 'catalogs');

 module.exports = Catalog;