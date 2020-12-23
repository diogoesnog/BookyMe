const Request = require('../../utils/Request');


module.exports.storeBookings = (token, store) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/store/${store}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}

module.exports.getUserBooking = (token) => {

    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/user`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}


// Create Booking
module.exports.createBooking = (token, body) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

// TODO: notify with notifications
module.exports.deleteBooking = (token, id) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/${id}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}