const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');
const checkAuth = require('../../middlewares/checkAuth');
const { isOpen } = require('../../utils/isOpen');
const Response = require('rapid-status');

/**
 * Get list of reservations
 */
app.get('/', (req, res) => {
    Booking.getBookings()
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/**
 * Get all the reservations of a store
 * URL param: /store/${id}
 */
app.get('/store/:id', (req, res) => {
    Booking.getBookingsByStore(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/**
 * Get all the reservations of the authenticated user
 * URL param: /user
 */
app.get('/user', checkAuth, (req, res) => {
    Booking.getBookingsByUser(req.user.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/**
 * Create a reservation
 * URL param: /${storeId}
 * body {array} with the following object
 * {serviceDate}: Date,
 * {Schedule}: [
 *      {day}: String, Monday/Tuesday/...
 *      {openingHour}: String, HH:MM
 *      {closingHour}: String, HH:MM
 * ]
 */
app.post('/:storeId', checkAuth, (req, res) => {

    const booking = {
        bookingDate: new Date(Date.now()).toISOString(),
        serviceDate: new Date(req.body.serviceDate).toISOString(),
        userId: req.user.id,
        storeId: req.params.storeId
    };

    if (new Date(Date.now()) > new Date(booking.serviceDate)) {
        response = Response.BAD_REQUEST("Invalid Date");
        res.status(response.status).jsonp(response);
    }
    else {
        const serviceOpen = isOpen(new Date(booking.serviceDate), req.body.schedule);

        if (serviceOpen) {
            Booking.createBooking(booking)
                .then(data => {
                    response = Response.OK(data);
                    res.status(response.status).jsonp(response);
                })
                .catch(err => {
                    response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
            });
        } else {
            response = Response.BAD_REQUEST("The service is closed");
            res.status(response.status).jsonp(response);
        }
    }
});

/**
 * Delete a reservation by id
 * URL param: id
 */
app.delete('/:id', checkAuth, async (req, res) => {
    try {
        const ReservationUserId = (await Booking.getUserFromID(req.params.id)).userId;

        if (ReservationUserId === req.user.id) {
            Booking.cancelBookings(req.params.id)
                .then(data => {
                    response = Response.OK(data);
                    res.status(response.status).jsonp(response);
                })
                .catch(err => {
                    response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
                });
        } else {
            response = Response.UNAUTHORIZED("The reservation doesn't belong to the authenticated user");
            res.status(response.status).jsonp(response);
        }
    } catch {
        response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }
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
app.put('/', checkAuth, async (req, res) => {
    const id = req.body.id;
    const bookingDate = new Date(Date.now()).toISOString();
    const serviceDate = new Date(req.body.serviceDate).toISOString();

    try {
        const ReservationUserId = (await Booking.getUserFromID(id)).userId;

        if (ReservationUserId === req.user.id) {
            if (new Date(Date.now()) > new Date(serviceDate)) {
                response = Response.BAD_REQUEST("Invalid Date");
                res.status(response.status).jsonp(response);
            } else {
                const serviceOpen = isOpen(new Date(serviceDate), req.body.schedule);

                if (serviceOpen) {
                    Booking.reschedule(id, bookingDate, serviceDate)
                        .then(data => {
                            response = Response.OK(data);
                            res.status(response.status).jsonp(response);
                        })
                        .catch(err => {
                            response = Response.INTERNAL_ERROR(err);
                            res.status(response.status).jsonp(response);
                        });
                } else {
                    response = Response.BAD_REQUEST("The service is closed");
                    res.status(response.status).jsonp(response);
                }
            }
        } else {
            response = Response.UNAUTHORIZED("The reservation doesn't belong to the authenticated user");
            res.status(response.status).jsonp(response);
        }
    }
    catch {
        response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }
});

module.exports = app;
