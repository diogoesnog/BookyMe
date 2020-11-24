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

app.post('/', (req, res) => {
    const booking = {
        bookingDate: new Date(Date.now()),
        serviceDate: req.body.serviceDate,
        userId: req.body.userId,
        storeId: req.body.storeId
    };

    Booking.createBooking(booking)
        .then(data => {
            res.status(200).jsonp(data);
        }).catch(err => {
            res.status(500).jsonp(err);
        });
});

app.delete('/:id', (req, res) => {
    Booking.cancelBookings(req.params.id)
        .then(data => {
            res.status(200).jsonp(data);
        })
        .catch(err => res.status(400).jsonp(err));
});

module.exports = app;
