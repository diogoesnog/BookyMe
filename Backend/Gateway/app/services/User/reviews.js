const Request = require('../../utils/Request');


module.exports.getAll = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/review`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.addOne = (token, review) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/review`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(review);
}

module.exports.deleteOne = (token, review) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/review/${review}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}