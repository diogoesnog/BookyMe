const Request = require('../utils/Request');
/*let newNotification = new Notification({
    sentBy: sentBy, // vem da middleware
    userId: userId,
    message: message,
    storeId: storeId
});*/
module.exports.sendNotification = (token, body) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(JSON.stringify(body));
}