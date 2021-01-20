const Request = require('../../utils/Request');

module.exports.getSlotStore = (token, id, params) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/slot/store/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.setParams(params);
    request.acceptJson();

    return request.get();
}

module.exports.newSlotStore = (token, id, body) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/slot/store/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

module.exports.deleteSlot = (token, id) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/slot/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}
