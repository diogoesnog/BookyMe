const Booking = require('../models/booking.js');

module.exports.createBooking = ({bookingDate, serviceDate, userId, storeId}) => {
    const newBooking = new Booking({
        bookingDate : bookingDate,
        serviceDate : serviceDate,
        userId : userId,
        storeId : storeId
    });

    return newBooking.save();
};

module.exports.getBookings = (query, projection) => {
    return Booking.find(query, projection);
};

module.exports.cancelBookings = (id) => {
    return Booking.findByIdAndDelete(id, function (err, docs) {
        /*
        if (err){
            console.log(err);
        }
        else{
            console.log("Deleted : ", docs);
        }
        */
    });
};
