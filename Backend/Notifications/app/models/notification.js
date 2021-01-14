const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    _id: {
        type: mongoose.ObjectId,
        auto: true,
        required: true
    },
    sentBy: {
        type: String,
        required: true
    },
    storeId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    },
    readAt: {
        type: Date,
        required: false
    },
    message: {
        type: String,
        required: true
    }
});

const Notification = mongoose.model('notifications', notificationSchema, 'notifications');

module.exports = Notification;