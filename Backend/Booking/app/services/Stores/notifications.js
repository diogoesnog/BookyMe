const Request = require('../../utils/Request');

/*
let newNotification = new Notification({
        sentBy: sentBy,
        userId: userId,
        message: message,
        storeId: storeId
    });
 */
module.exports.sendNotification = (token, {userId, message, storeId}) => {
    let request = new Request(`${process.env.}`)
}