const Request = require('../../utils/Request');


// Needs to be admin
module.exports.getStoreReservations = (token, store) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/store/${store}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getUserReservations = (token) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/user`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getPopularStores = (token) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/popular`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

// Create Booking
// TODO: a ser alterado
module.exports.createBooking = (token, body, id) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

// TODO: notify with notifications
module.exports.deleteReservation = (token, id) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.patch();
}

// TODO: irá ser alterado
module.exports.changeReservation = (token, body, id) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.put(body);
}

module.exports.canceled = (token, params) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/canceled`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.setParams(params);
    request.acceptJson();

    return request.get();
}

module.exports.concluded = (token, params) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/concluded`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.setParams(params);
    request.acceptJson();

    return request.get();
}

module.exports.current = (token, params) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/current`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.setParams(params);
    request.acceptJson();

    return request.get();
}

module.exports.getUserReservationsCurrent = (token) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/user/current`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getUserReservationsConcluded = (token) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/user/concluded`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getSlots = (token, id) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/slot/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}
