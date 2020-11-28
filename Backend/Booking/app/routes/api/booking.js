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
        serviceDate: new Date(req.body.serviceDate),
        userId: req.body.userId,
        storeId: req.body.storeId
    };

    if (new Date(Date.now()) > booking.serviceDate) {
        res.status(400).jsonp({msg: "Invalid Date"});
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

app.put('/', (req, res) => {
    const id = req.body.id;
    const bookingDate = new Date(Date.now());
    const serviceDate = new Date(req.body.serviceDate);

    if (new Date(Date.now()) > serviceDate) {
        res.status(400).jsonp({msg: "Invalid Date"});
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
