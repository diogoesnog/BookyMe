const express = require('express');
const app = express.Router();
const Slot = require('../../controllers/slot');
const isAdmin = require('../../middlewares/isAdmin');
const getStoreId = require('../../middlewares/getStoreIdFromSlotId');
const Response = require('rapid-status');
const Booking = require("../../controllers/booking");
const {isOpen} = require("../../utils/isOpen");
const {getScheduleDay} = require("../../utils/getScheduleDay");

app.post('/store/:id', isAdmin, async (req, res) => {
    const storeId = req.params.id;
    const date = req.body.date;
    const capacity = req.body.capacity;

    if (req.user.isAdmin === true) {
        // Check if the date is in the past
        if (new Date(Date.now()) > new Date(date)) {
            const response = Response.BAD_REQUEST("The date is from the past!");
            res.status(response.status).jsonp(response);
            return;
        }

        // Get Schedule
        let schedule;
        try {
            schedule = await getScheduleDay(date, storeId);
        } catch {
            const response = Response.INTERNAL_ERROR("Error getting schedule");
            res.status(response.status).jsonp(response);
            return;
        }
        if (schedule === undefined) {
            const response = Response.INTERNAL_ERROR("There is no store schedule for that day");
            res.status(response.status).jsonp(response);
            return;
        }

        // Check if service is open
        const serviceOpen = isOpen(new Date(date), schedule);
        if (!serviceOpen) {
            const response = Response.BAD_REQUEST("The service is closed");
            res.status(response.status).jsonp(response);
            return;
        }

        const booking = {
            storeId: storeId,
            date: date,
            capacity: capacity
        };

        Slot.newSlot(booking)
            .then(data => {
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

app.get('/store/:id', isAdmin, (req, res) => {
    const storeId = req.params.id;

    if (req.user.isAdmin === true) {
        Slot.getStoreSlots(storeId)
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

app.delete('/:id', getStoreId, isAdmin, async (req, res) => {
    const slotId = req.params.id;

    if (req.user.isAdmin === true) {
        // Check if there are booking using the slot
        const currentCapacity = (await Booking.getSlotCurrentCapacity(slotId)).shift();
        if (currentCapacity && currentCapacity.currentCapacity > 0) {
            const response = Response.UNAUTHORIZED("Slot not removed. There are reservations using the slot");
            res.status(response.status).jsonp(response);
        }
        else {
            Slot.removeSlot(slotId)
                .then(data=> {
                    const response = Response.OK(data);
                    res.status(response.status).jsonp(response);
                })
                .catch(err => {
                    const response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
                })
        }

    } else {
        const response = Response.UNAUTHORIZED("The user is not an admin of that store");
        res.status(response.status).jsonp(response);
    }
});

module.exports = app;
