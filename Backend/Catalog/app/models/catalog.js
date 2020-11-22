const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
   store: {
       type : String,
       required: true
   },
   product: {
       type: String,
       required: true
   },
   price: {
       type: Number
   },
   rating: {
       type: Number
   },
   description: {
       type: String
   }

});

const Catalog = mongoose.model('catalog', catalogSchema, 'catalog');

module.exports = Catalog;