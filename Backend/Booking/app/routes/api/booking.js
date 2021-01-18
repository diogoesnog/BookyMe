const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');
const Slot = require('../../controllers/slot');
const checkAuth = require('../../middlewares/checkAuth');
const isAdmin = require('../../middlewares/isAdmin');
const getStoreIdFromBookingId = require('../../middlewares/getStoreIdFromBookingId');
const getStoreIdFromSlotId = require('../../middlewares/getStoreIdFromSlotId');
const { sameDay } = require('../../utils/sameDay')
const Response = require('rapid-status');
const {isSlotValid} = require("../../utils/isSlotValid");
const {storeInfo} = require("../../utils/storeInfo");
const Notification = require('../../services/notifications');
const moment = require("moment");
moment.locale("pt");

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
    const state = req.query.state;
    const canceled = req.query.canceled || false;

    if (req.user.isAdmin === true) {
        Booking.getBookingsByStore(req.params.id, state, canceled)
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
    const userId = req.user.id;
    const bookId = req.query.bookId;

    if (!bookId) {
        Booking.getBookingsByUser(userId)
            .then(data => {
                const response = Response.OK(data);
                res.status(response.status).jsonp(response);
            })
            .catch(err => {
                const response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            });
    }
    else {
        Booking.getBookingByUserBookId(userId, bookId)
            .then(data => {
                const response = Response.OK(data);
                res.status(response.status).jsonp(response);
            })
            .catch(err => {
                const response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            });
    }
});

app.get('/user/current', checkAuth, (req, res) => {
    const date_now = new Date(Date.now());

    Booking.getBookingsByUserCurrent(req.user.id, date_now)
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
 * Get all the reservations of the authenticated user
 * URL param: /user
 */
app.get('/user/concluded', checkAuth, (req, res) => {
    const date_now = new Date(Date.now());

    Booking.getBookingsByUserConcluded(req.user.id, date_now)
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
    const serviceId = req.body.serviceId;
    const slotId = req.body.slotId;
    const storeId = req.params.storeId;
    const userId = req.user.id;

    let city, storeName, photoPath, hasCatalog, catalog;
    let willBeFull = false;

    // Check if slot belongs to the store and if it is full
    let response;
    switch (await isSlotValid(slotId, storeId)) {
        case 0:
            break;
        case 2:
            willBeFull = true;
            break;
        case 1:
            response = Response.BAD_REQUEST("Selected Slot is Full!");
            res.status(response.status).jsonp(response);
            return;
        case -1:
            response = Response.BAD_REQUEST("Slot doesn't belong to the store");
            res.status(response.status).jsonp(response);
            return;
        case -2:
            response = Response.BAD_REQUEST("Please enter a valid slot");
            res.status(response.status).jsonp(response);
            return;
        case -3:
            response = Response.INTERNAL_ERROR( "Error getting the capacity of the slot. Does the slot exist?");
            res.status(response.status).jsonp(response);
            break
    }

    // Get store info
    try {
        [city, storeName, photoPath, hasCatalog, catalog] = await storeInfo(storeId, serviceId);
    } catch {
        const response = Response.INTERNAL_ERROR("Error getting info about the store");
        res.status(response.status).jsonp(response);
        return;
    }

    // Get serviceDate
    let serviceDate;
    try {
        serviceDate = (await Slot.getServiceDate(slotId)).date;
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
        return;
    }

    // Check if serviceDate is in the past
    if (new Date(Date.now()) > new Date(serviceDate)) {
        const response = Response.BAD_REQUEST("The date is from the past!");
        res.status(response.status).jsonp(response);
        return;
    }

    const booking = {
        bookingDate: new Date(Date.now()).toISOString(),
        serviceDate: new Date(serviceDate).toISOString(),
        userId: userId,
        storeId: storeId,
        city: city,
        storeName: storeName,
        mainStorePhotoURL: photoPath,
        slotId: slotId,
        hasCatalog: hasCatalog,
        service: catalog
    };

    // Remove undefined values from booking
    Object.keys(booking).forEach(function (key) {
        if(booking[key] === undefined) delete booking[key];
    });

    // Create Booking
    try {
        const data = await Booking.createBooking(booking);
        if (willBeFull)
            await Slot.slotIsFull(slotId);
        const response = Response.OK(data);
        res.status(response.status).jsonp(response);
    }
    catch (err) {
        const response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
});

/**
 * Cancel a reservation by id
 * URL param: id
 */
app.patch('/:id', checkAuth, getStoreIdFromBookingId, isAdmin, async (req, res) => {
    const bookingId = req.params.id;

    try {
        const ReservationUserId = (await Booking.getUserFromID(req.params.id)).userId;

        if (ReservationUserId === req.user.id || req.user.isAdmin === true) {

            try {
                const data = await Booking.cancelBookings(bookingId);
                const old_slotId = (await Booking.getSlotIdFromBookingId(bookingId)).slotId;
                await Slot.slotIsNotFull(old_slotId);
                let header = req.headers.authorization || req.headers.Authorization;

                const response = Response.OK(data);
                res.status(response.status).jsonp(response);

                await Notification.sendNotification(header, { userId: ReservationUserId,
                    // message: `A sua reserva para o dia ${moment(serviceDate).format('l')} foi cancelada`,
                    message: "A sua reserva foi cancelada.",
                    storeId: "id da store"
                });

            } catch (err) {
                const response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            }

        } else {
            const response = Response.UNAUTHORIZED("Logged in user doesn't have permission to delete this reservation");
            res.status(response.status).jsonp(response);
        }
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
});

/**
 * Reschedule booking reservation
 * URL param: id
 * body {array} with the following object
 * {serviceDate}: Date
 */
app.put('/:id', checkAuth, getStoreIdFromBookingId, isAdmin, async (req, res) => {
    const bookingId = req.params.id;
    const bookingDate = new Date(Date.now()).toISOString();
    const serviceId = req.body.serviceId;
    const slotId = req.body.slotId;
    const storeId = req.storeId;

    let catalog;
    let old_slotId;
    let willBeFull = false;

    try {
        old_slotId = (await Booking.getSlotIdFromBookingId(bookingId)).slotId;
    }
    catch (err) {
        response = Response.INTERNAL_ERROR( err);
        res.status(response.status).jsonp(response);
    }

    // Check if slot belongs to the store and if it is full
    let response;
    if (old_slotId !== slotId) {
        switch (await isSlotValid(slotId, storeId)) {
            case 0:
                break;
            case 2:
                willBeFull = true;
                break;
            case 1:
                response = Response.BAD_REQUEST("Selected Slot is Full!");
                res.status(response.status).jsonp(response);
                return;
            case -1:
                response = Response.BAD_REQUEST("Slot doesn't belong to the store");
                res.status(response.status).jsonp(response);
                return;
            case -2:
                response = Response.BAD_REQUEST("Please enter a valid slot");
                res.status(response.status).jsonp(response);
                return;
            case -3:
                response = Response.INTERNAL_ERROR("Error getting the capacity of the slot. Does the slot exist?");
                res.status(response.status).jsonp(response);
                break
        }
    }

    // Get store info
    try {
        [_, _, _, _, catalog] = await storeInfo(storeId, serviceId);
    } catch {
        const response = Response.INTERNAL_ERROR("Error getting info about the store");
        res.status(response.status).jsonp(response);
        return;
    }

    // Get serviceDate
    let serviceDate;
    try {
        serviceDate = (await Slot.getServiceDate(slotId)).date;
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
        return;
    }

    // Check if serviceDate is in the past
    if (new Date(Date.now()) > new Date(serviceDate)) {
        const response = Response.BAD_REQUEST("The date is from the past!");
        res.status(response.status).jsonp(response);
        return;
    }

    let ReservationUserId;
    try {
        ReservationUserId = (await Booking.getUserFromID(req.params.id)).userId;
    }
    catch {
        const response = Response.INTERNAL_ERROR("Can't find userID. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }

    if (ReservationUserId === req.user.id || req.user.isAdmin === true) {
        try {
            console.log(old_slotId);
            const data = await Booking.reschedule(bookingId, bookingDate, serviceDate, slotId, catalog);
            if (old_slotId !== slotId) {
                await Slot.slotIsNotFull(old_slotId);
                if (willBeFull)
                    await Slot.slotIsFull(slotId);
            }
            const response = Response.OK(data);
            res.status(response.status).jsonp(response);

            let header = req.headers.authorization || req.headers.Authorization;

            await Notification.sendNotification(header, { userId: ReservationUserId,
                message: `A sua reserva para o dia X foi reagendada para o dia ${moment(serviceDate).format('l')}`,
                storeId: "id da store"
            });

        } catch (err) {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        }
    } else {
        const response = Response.UNAUTHORIZED("Logged in user doesn't have permission to reschedule this reservation");
        res.status(response.status).jsonp(response);
    }
});

app.get('/current', checkAuth, (req, res) => {
    const date_now = new Date(Date.now());
    const date = req.query.date || date_now;
    const storeID = req.query.storeId;

    let date_ini = new Date(date).setHours(0,0, 0);
    let date_fin = new Date(date_ini).setHours(23,59, 59);

    if (sameDay(date_now, new Date(date_ini))) { // Same Day
        date_ini = new Date(date_ini).setHours(date_now.getHours(), date_now.getMinutes(), date_now.getSeconds());
    } else if (date_now > new Date(date_ini)) { // Past
        const response = Response.OK([{"count": 0}]);
        res.status(response.status).jsonp(response);
        return;
    }

    Booking.count(storeID, date_ini, date_fin, false)
        .then(data => {
            if (data.length === 0) {
                data = [{"count": 0}]
            }
            const response = Response.OK(data[0]);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.get('/concluded', checkAuth, (req, res) => {
    const date_now = new Date(Date.now());
    const date = req.query.date || date_now;
    const storeID = req.query.storeId;

    let date_ini = new Date(date).setHours(0,0, 0);
    let date_fin = new Date(date_ini).setHours(23,59, 59);

    if (sameDay(date_now, new Date(date_ini))) { // Same Day
        date_fin = new Date(date_fin).setHours(date_now.getHours(), date_now.getMinutes(), date_now.getSeconds());
    } else if (date_now < new Date(date_ini)) { // Past
        const response = Response.OK([{"count": 0}]);
        res.status(response.status).jsonp(response);
        return;
    }

    Booking.count(storeID, date_ini, date_fin, false)
        .then(data => {
            if (data.length === 0) {
                data = [{"count": 0}]
            }
            const response = Response.OK(data[0]);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.get('/canceled', checkAuth, (req, res) => {
    const date_now = new Date(Date.now());
    const date = req.query.date || date_now;
    const storeID = req.query.storeId;

    const date_ini = new Date(date).setHours(0,0, 0);
    const date_fin = new Date(date_ini).setHours(23,59, 59);

    Booking.count(storeID, date_ini, date_fin, true)
        .then(data => {
            if (data.length === 0) {
                data = [{"count": 0}]
            }
            const response = Response.OK(data[0]);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            const response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

app.get('/slot/:id', getStoreIdFromSlotId, isAdmin, (req, res) => {
    if (req.user.isAdmin === true) {
        Booking.getSlots(req.params.id)
            .then(data=> {
                const response = Response.OK(data);
                res.status(response.status).jsonp(response);
            })
            .catch(err => {
                const response = Response.INTERNAL_ERROR(err);
                res.status(response.status).jsonp(response);
            })
    } else {
        const response = Response.UNAUTHORIZED("The user is not an admin of that store");
        res.status(response.status).jsonp(response);
    }
});

module.exports = app;
