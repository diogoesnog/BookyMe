const Request = require('../../utils/Request');


module.exports.storeBookings = (store) => {
    let request = new Request(`${process.env.BOOKING_SERVICE_ENDPOINT}/booking/store/${store}`);

    request.isJson();
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