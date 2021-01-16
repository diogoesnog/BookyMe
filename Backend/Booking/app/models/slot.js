const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        required: true,
        auto: true
    },
    storeId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
})

const Slot = mongoose.model('slot', slotSchema, 'slot');

module.exports = Slot;
