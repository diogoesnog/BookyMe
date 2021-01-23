const Notification = require('../models/notification');

module.exports.publish = ({ storeId, userId, message }, sentBy) => {
    let newNotification = new Notification({
        sentBy: sentBy,
        userId: userId,
        message: message,
        storeId: storeId
    });

    return newNotification.save();

}


module.exports.getUserNotifcations = (userId, read) => {
    return Notification.find({ userId: userId, read: read });
}

module.exports.markRead = (id, user) => {
    return Notification.findOneAndUpdate( { _id: id, userId: user, read: false }, { read: true, readAt: new Date() }, { new: true } );
}

module.exports.getStoreNotifications = (id) => {
    return Notification.find( {storeId: id} );
}