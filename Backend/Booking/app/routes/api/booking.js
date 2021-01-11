const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');
const checkAuth = require('../../middlewares/checkAuth');
const isAdmin = require('../../middlewares/isAdmin');
const getStoreId = require('../../middlewares/getStoreId');
const { isOpen } = require('../../utils/isOpen');
const { sameDay } = require('../../utils/sameDay')
const Response = require('rapid-status');
const Store = require('../../services/Stores/stores');
const Catalog = require('../../services/Stores/catalog');

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
    let city, storeName, photoPath, catalogData, hasCatalog = false;
    const serviceId = req.body.serviceId;
    let catalog;

    try {
        city = (await Store.getStore(req.params.storeId)).data.data.address.city;
        storeName = (await Store.getStore(req.params.storeId)).data.data.name;
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err, "Error getting info about the store");
        res.status(response.status).jsonp(response);
    }
    try { // optional
        photoPath = (await Store.getStore(req.params.storeId)).data.data.photos.shift().url;
    } catch {}

    try {
        catalogData = (await Catalog.getByStore(req.params.storeId)).data.data;
        console.log(catalogData);
        if (catalogData.length > 0) {
            if (serviceId !== null) {
                for (item in catalogData)
                    if (serviceId === catalogData[item]._id)
                        catalog = {
                            _id: serviceId,
                            product: catalogData[item].product,
                            price: catalogData[item].price,
                            abstract: catalogData[item].abstract
                        }
            }
            hasCatalog = true;
        }
    } catch {
        hasCatalog = false;
    }

    const booking = {
        bookingDate: new Date(Date.now()).toISOString(),
        serviceDate: new Date(req.body.serviceDate).toISOString(),
        userId: req.user.id,
        storeId: req.params.storeId,
        city: city,
        storeName: storeName,
        mainStorePhotoURL: photoPath,
        hasCatalog: hasCatalog,
        service: catalog
    };

    // Remove undefined values from booking
    Object.keys(booking).forEach(function (key) {
        if(booking[key] === undefined) delete booking[key];
    });

    if (new Date(Date.now()) > new Date(booking.serviceDate)) {
        const response = Response.BAD_REQUEST("The date is from the past!");
        res.status(response.status).jsonp(response);
        return;
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
        return;
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
 * Cancel a reservation by id
 * URL param: id
 */
app.patch('/:id', checkAuth, getStoreId, isAdmin, async (req, res) => {
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
            return;
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

app.get('/current', checkAuth, (req, res) => {
    const date = req.query.date
    const storeID = req.query.storeId

    let date_ini = new Date(date).setHours(0,0, 0);
    let date_fin = new Date(date_ini).setHours(23,59, 59);
    const date_now = new Date(Date.now());

    if (sameDay(date_now, new Date(date_ini))) { // Same Day
        date_ini = new Date(date_ini).setHours(date_now.getHours(), date_now.getMinutes(), date_now.getSeconds());
    } else if (date_now > new Date(date_ini)) { // Past
        const response = Response.OK([]);
        res.status(response.status).jsonp(response);
        return;
    }

    if (date_ini == "Invalid Date") {
        const response = Response.BAD_REQUEST("Invalid Date");
        res.status(response.status).jsonp(response);
        return;
    }

    Booking.count(storeID, date_ini, date_fin, false)
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.get('/concluded', checkAuth, (req, res) => {
    const date = req.query.date
    const storeID = req.query.storeId

    let date_ini = new Date(date).setHours(0,0, 0);
    let date_fin = new Date(date_ini).setHours(23,59, 59);
    const date_now = new Date(Date.now());

    if (sameDay(date_now, new Date(date_ini))) { // Same Day
        date_fin = new Date(date_fin).setHours(date_now.getHours(), date_now.getMinutes(), date_now.getSeconds());
    } else if (date_now < new Date(date_ini)) { // Past
        const response = Response.OK([]);
        res.status(response.status).jsonp(response);
        return;
    }

    if (date_ini == "Invalid Date") {
        const response = Response.BAD_REQUEST("Invalid Date");
        res.status(response.status).jsonp(response);
        return;
    }

    Booking.count(storeID, date_ini, date_fin, false)
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.get('/canceled', checkAuth, (req, res) => {
    const date = req.query.date
    const storeID = req.query.storeId

    const date_ini = new Date(date).setHours(0,0, 0);
    const date_fin = new Date(date_ini).setHours(23,59, 59);

    if (date_ini == "Invalid Date") {
        const response = Response.BAD_REQUEST("Invalid Date");
        res.status(response.status).jsonp(response);
        return;
    }

    Booking.count(storeID, date_ini, date_fin, true)
        .then(data => {
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

module.exports = app;
