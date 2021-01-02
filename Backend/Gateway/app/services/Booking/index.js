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

module.exports.getPopularStores = () => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/popular`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

// Create Booking
// TODO: a ser alterado
module.exports.createBooking = (token, body) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking`);

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

    return request.delete();
}

// TODO: irá ser alterado
module.exports.changeReservation = () => {

}