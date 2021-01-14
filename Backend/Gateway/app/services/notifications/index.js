const Request = require('../../utils/Request');


module.exports.notify = (token, body) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

module.exports.getInbox = (token) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.markAsRead = (token, id) => {
    let request = new Request(`${process.env.NOTIFICATION_SERVICE_ENDPOINT}/notification/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.patch();
}