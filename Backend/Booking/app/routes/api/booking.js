const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');
const checkAuth = require('../../middlewares/checkAuth');
const isAdmin = require('../../middlewares/isAdmin');
const getStoreId = require('../../middlewares/getStoreId');
const { isOpen } = require('../../utils/isOpen');
const Response = require('rapid-status');
const Store = require('../../services/Stores/stores');

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

/**
 * Create a reservation
 * URL param: /${storeId}
 * body {array} with the following object
 * {serviceDate}: Date
 */
app.post('/:storeId', checkAuth, async (req, res) => {
    let city;
    try {
        city = (await Store.getStore(req.params.storeId)).data.data.category;
        console.log(city);
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err, "Error Getting Store's City");
        res.status(response.status).jsonp(response);
    }

    const booking = {
        bookingDate: new Date(Date.now()).toISOString(),
        serviceDate: new Date(req.body.serviceDate).toISOString(),
        userId: req.user.id,
        storeId: req.params.storeId,
        city: "Lisboa"
    };

    if (new Date(Date.now()) > new Date(booking.serviceDate)) {
        const response = Response.BAD_REQUEST("The date is from the past!");
        res.status(response.status).jsonp(response);
    }

    let schedule;
    let weekService = new Date(booking.serviceDate).toLocaleTimeString('pt-pt', {weekday: 'long'}).split(',')[0];
    weekService = weekService.charAt(0).toUpperCase() + weekService.slice(1); // Capitalize the First Letter
    try {
        schedule = (await Store.getSchedule(booking.storeId, weekService)).data.data.schedule["0"];
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }

    if (schedule == null) {
        const response = Response.INTERNAL_ERROR("There is no store schedule for that day");
        res.status(response.status).jsonp(response);
    }

    const serviceOpen = isOpen(new Date(booking.serviceDate), schedule);
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

/**
 * Reschedule booking reservation
 * URL param: id
 * body {array} with the following object
 * {serviceDate}: Date
 */
app.put('/:id', checkAuth, getStoreId, isAdmin, async (req, res) => {
    const bookingDate = new Date(Date.now()).toISOString();
    const serviceDate = new Date(req.body.serviceDate).toISOString();
    let schedule, ReservationUserId;

    let weekService = new Date(serviceDate).toLocaleTimeString('pt-pt', {weekday: 'long'}).split(',')[0];
    weekService = weekService.charAt(0).toUpperCase() + weekService.slice(1); // Capitalize the First Letter

    try {
        schedule = (await Store.getSchedule(req.storeId, weekService)).data.data.schedule["0"];
    } catch {
        const response = Response.INTERNAL_ERROR("There is no store schedule for that day");
        res.status(response.status).jsonp(response);
    }

    try {
        ReservationUserId = (await Booking.getUserFromID(req.params.id)).userId;
    }
    catch {
        const response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }

    if (ReservationUserId === req.user.id || req.user.isAdmin === true) {

        if (new Date(Date.now()) > new Date(serviceDate)) {
            const response = Response.BAD_REQUEST("Invalid Date");
            res.status(response.status).jsonp(response);
        } else {
            const serviceOpen = isOpen(new Date(serviceDate), schedule);

            if (serviceOpen) {
                Booking.reschedule(req.params.id, bookingDate, serviceDate)
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
        const response = Response.UNAUTHORIZED("Logged in user doesn't have permission to reschedule this reservation");
        res.status(response.status).jsonp(response);
    }
});

module.exports = app;
