const express = require('express');
const app = express.Router();
const Booking = require('../../controllers/booking');

app.get('/', (req, res) => {
    const queries = req.query;
    Booking.getBookings()
        .then(data => {
            res.status(200).jsonp(data);
        }).catch(err => {
            res.status(500).jsonp(err);
        });
});

app.post('/', async (req, res) => {
    const booking = {
        bookingDate: new Date(Date.now()),
        serviceDate: new Date(req.body.serviceDate),
        userId: req.body.userId,
        storeId: req.body.storeId
    };

    if (new Date(Date.now()) > booking.serviceDate) {
        res.status(400).jsonp({msg: "Invalid Date"});
    }
    else if (await Booking.dateExists(booking.serviceDate, booking.storeId)) {
        res.status(400).jsonp({msg: "There is already a service scheduled for that time"});
    }
    else {
        Booking.createBooking(booking)
            .then(data => {
                res.status(200).jsonp(data);
            }).catch(err => {
            res.status(500).jsonp(err);
        });
    }
});

app.delete('/:id', (req, res) => {
    Booking.cancelBookings(req.params.id)
        .then(data => {
            res.status(200).jsonp(data);
        })
        .catch(err => res.status(400).jsonp(err));
});

app.put('/', async (req, res) => {
    const id = req.body.id;
    const bookingDate = new Date(Date.now());
    const serviceDate = new Date(req.body.serviceDate);
    const storeId = (await Booking.getStoreFromID(id)).storeId;

    if (new Date(Date.now()) > serviceDate) {
        res.status(400).jsonp({msg: "Invalid Date"});
    }
    else if (await Booking.dateExists(serviceDate, storeId)) {
        res.status(400).jsonp({msg: "There is already a service scheduled for that time"});
    }
    else {
        Booking.reschedule(id, bookingDate, serviceDate)
            .then(data => {
                res.status(200).jsonp(data);
            })
            .catch(err => res.status(400).jsonp(err));
    }
});

module.exports = app;
