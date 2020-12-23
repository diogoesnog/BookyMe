const Request = require('../../utils/Request');

module.exports.isAdmin = (token, id) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/store/admin/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getStores = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/store`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

// TODO: Ask for a new logic
module.exports.addOne = (token, id) => {

}

module.exports.deleteStore = (token, id) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/store/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}