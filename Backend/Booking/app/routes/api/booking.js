const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');

/**
 * Get list of reservations
 */
app.get('/', (req, res) => {
    Booking.getBookings()
        .then(data => {
            res.status(200).jsonp(data);
        }).catch(err => {
        res.status(500).jsonp(err);
    });
});

/**
 * Create a reservation
 * body {array} with the following object
 * {serviceDate}: Date,
 * {userId}: String,
 * {storeId}: String,
 * {Schedule}: [
 *      {day}: String, Monday/Tuesday/...
 *      {openingHour}: String, HH:MM
 *      {closingHour}: String, HH:MM
 * ]
 */
app.post('/', async (req, res) => {
    const booking = {
        bookingDate: new Date(Date.now()).toISOString(),
        serviceDate: new Date(req.body.serviceDate).toISOString(),
        userId: req.body.userId,
        storeId: req.body.storeId
    };

    if (new Date(Date.now()) > new Date(booking.serviceDate)) {
        res.status(400).jsonp({msg: "Invalid Date"});
    }
    // else if (await Booking.dateExists(booking.serviceDate, booking.storeId)) {
    //     res.status(400).jsonp({msg: "There is already a service scheduled for that time"});
    // }
    else {
        serviceOpen = isOpen(new Date(booking.serviceDate), req.body.schedule);

        if (serviceOpen) {
            Booking.createBooking(booking)
                .then(data => {
                    res.status(200).jsonp(data);
                }).catch(err => {
                res.status(500).jsonp(err);
            });
        } else {
            res.status(500).jsonp({msg: "The service is closed"});
        }
    }
});

/**
 * Delete a reservation by id
 * URL param: id
 */
app.delete('/:id', (req, res) => {
    Booking.cancelBookings(req.params.id)
        .then(data => {
            res.status(200).jsonp(data);
        })
        .catch(err => res.status(400).jsonp(err));
});

/**
 * Reschedule booking reservation
 * body {array} with the following object
 * {id}: ObjectId,
 * {serviceDate}: Date,
 * {Schedule}: [
 *      {day}: String, Monday/Tuesday/...
 *      {openingHour}: String, HH:MM
 *      {closingHour}: String, HH:MM
 * ]
 */
app.put('/', async (req, res) => {
    const id = req.body.id;
    const bookingDate = new Date(Date.now()).toISOString();
    const serviceDate = new Date(req.body.serviceDate).toISOString();
    const storeId = (await Booking.getStoreFromID(id)).storeId;

    if (new Date(Date.now()) > new Date(serviceDate)) {
        res.status(400).jsonp({msg: "Invalid Date"});
    }
    // else if (await Booking.dateExists(serviceDate, storeId)) {
    //     res.status(400).jsonp({msg: "There is already a service scheduled for that time"});
    // }
    else {
        serviceOpen = isOpen(new Date(serviceDate), req.body.schedule);

        if (serviceOpen) {
            Booking.reschedule(id, bookingDate, serviceDate)
                .then(data => {
                    res.status(200).jsonp(data);
                })
                .catch(err => res.status(400).jsonp(err));
        } else {
            res.status(500).jsonp({msg: "The service is closed"});
        }
    }
});

function isOpen (serviceDate, schedule) {
    const weekService = serviceDate.toLocaleTimeString('en-us', {weekday: 'long'}).split(' ')[0];

    for (let item of schedule) {
        if (item.day === weekService) {
            const closingHour = item.closingHour.split(':');
            const openingHour = item.openingHour.split(':');
            const serviceHour = [serviceDate.getUTCHours(), serviceDate.getUTCMinutes()];

            if (serviceHour[0] > openingHour[0] && serviceHour[0] < closingHour[0])
                return true;
            else if (serviceHour[0] == openingHour[0] && serviceHour[1] > openingHour[1])
                return true;
            else if (serviceHour[0] == closingHour[0] && serviceHour[1] < closingHour[1])
                return true;
        }
    }
    return false;
}

module.exports = app;
