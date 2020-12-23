const Request = require('../../utils/Request');

module.exports.getAll = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/booking`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}


module.exports.addOne = (token, booking) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/booking`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(booking);
}


module.exports.deleteOne = (token, booking) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/booking/${booking}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}