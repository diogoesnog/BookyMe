const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');
const checkAuth = require('../../middlewares/checkAuth');
const isAdmin = require('../../middlewares/isAdmin');
const getStoreId = require('../../middlewares/getStoreId');
const { isOpen } = require('../../utils/isOpen');
const Response = require('rapid-status');

/**
 * Get list of reservations
 */
app.get('/', checkAuth, (req, res) => {
    Booking.getBookings()
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/**
 * Get all the reservations of a store
 * URL param: /store/${id}
 */
app.get('/store/:id', isAdmin, (req, res) => {
    if (req.user.isAdmin === true) {
        Booking.getBookingsByStore(req.params.id)
            .then(data => {
                const response = Response.OK(data);
                res.status(response.status).jsonp(response);
            })
            .catch(err => {
                const response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            });
    } else {
        const response = Response.UNAUTHORIZED("The user is not an admin of that store");
        res.status(response.status).jsonp(response);
    }
});

/**
 * Get all the reservations of the authenticated user
 * URL param: /user
 */
app.get('/user', checkAuth, (req, res) => {
    Booking.getBookingsByUser(req.user.id)
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/**
 * Get Number of reservations for each store
 * URL: /popular
 */
app.get('/popular', checkAuth, (req, res) => {
    Booking.getPopularStoreList()
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

/** Irá ser simplificado **/
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
        const response = Response.BAD_REQUEST("Invalid Date");
        res.status(response.status).jsonp(response);
    }
    else {
        const serviceOpen = isOpen(new Date(booking.serviceDate), req.body.schedule);

        if (serviceOpen) {
            Booking.createBooking(booking)
                .then(data => {
                    const response = Response.OK(data);
                    res.status(response.status).jsonp(response);
                })
                .catch(err => {
                    const response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
            });
        } else {
            const response = Response.BAD_REQUEST("The service is closed");
            res.status(response.status).jsonp(response);
        }
    }
});

/**
 * Delete a reservation by id
 * URL param: id
 */
app.delete('/:id', checkAuth, getStoreId, isAdmin, async (req, res) => {
    try {
        const ReservationUserId = (await Booking.getUserFromID(req.params.id)).userId;

        if (ReservationUserId === req.user.id || req.user.isAdmin === true) {
            Booking.cancelBookings(req.params.id)
                .then(data => {
                    const response = Response.OK(data);
                    res.status(response.status).jsonp(response);
                })
                .catch(err => {
                    const response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
                });
        } else {
            const response = Response.UNAUTHORIZED("Logged in user doesn't have permission to delete this reservation");
            res.status(response.status).jsonp(response);
        }
    } catch {
        const response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }
});

/** Irá ser simplificado **/
/**
 * Reschedule booking reservation
 * URL param: id
 * body {array} with the following object
 * {serviceDate}: Date,
 * {Schedule}: [
 *      {day}: String, Monday/Tuesday/...
 *      {openingHour}: String, HH:MM
 *      {closingHour}: String, HH:MM
 * ]
 */
app.put('/:id', checkAuth, getStoreId, isAdmin, async (req, res) => {
    const id = req.params.id;
    const bookingDate = new Date(Date.now()).toISOString();
    const serviceDate = new Date(req.body.serviceDate).toISOString();

    try {
        const ReservationUserId = (await Booking.getUserFromID(id)).userId;

        if (ReservationUserId === req.user.id || req.user.isAdmin === true) {
            if (new Date(Date.now()) > new Date(serviceDate)) {
                const response = Response.BAD_REQUEST("Invalid Date");
                res.status(response.status).jsonp(response);
            } else {
                const serviceOpen = isOpen(new Date(serviceDate), req.body.schedule);

                if (serviceOpen) {
                    Booking.reschedule(id, bookingDate, serviceDate)
                        .then(data => {
                            const response = Response.OK(data);
                            res.status(response.status).jsonp(response);
                        })
                        .catch(err => {
                            const response = Response.INTERNAL_ERROR(err);
                            res.status(response.status).jsonp(response);
                        });
                } else {
                    const response = Response.BAD_REQUEST("The service is closed");
                    res.status(response.status).jsonp(response);
                }
            }
        } else {
            const response = Response.UNAUTHORIZED("Logged in user doesn't have permission to delete this reservation");
            res.status(response.status).jsonp(response);
        }
    }
    catch {
        const response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }
});

module.exports = app;
