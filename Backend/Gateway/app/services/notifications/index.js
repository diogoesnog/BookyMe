const Request = require('../../utils/Request');


module.exports.notify = (token, body) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

module.exports.getInbox = (token, read) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();
    request.appendParam("read", read)

    return request.get();
}

module.exports.markAsRead = (token, id) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.patch();
}

module.exports.getStoreNotifications = (token, id) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification/store/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}