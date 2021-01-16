const Request = require('../utils/Request');

module.exports.getUsersById = (array) => {
    let body = { users: array };
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/profiles`);

    request.isJson();
    request.acceptJson();

    return request.post(JSON.stringify(body));
}


module.exports.addStore = (token, storeId) => {
    let body = { store: storeId };
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/store`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(JSON.stringify(body));
}