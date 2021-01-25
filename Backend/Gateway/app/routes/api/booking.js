// General
const express = require('express');
const router = express.Router();
const fs = require('fs');

// Middlewares
const { validator } = require('../../middlewares/checkBody');
const checkAuth = require("../../middlewares/checkAuth");

const MulterFiles = require('../../utils/MulterFiles');
const uploader = new MulterFiles('stores');
const upload = uploader.getUploader();

// Services
const Booking = require('../../services/Booking');

router.get('/store/:id', checkAuth, (req, res) => {
    // let body = JSON.stringify(req.body);
    let token = req.headers.Authorization || req.headers.authorization;
    let query = req.query

    Booking.getStoreReservations(token, req.params.id, query)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.get('/user', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let query = req.query

    Booking.getUserReservations(token, query)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.get('/popular', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getPopularStores(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// Store ID
router.post('/:id', checkAuth, validator([
    "slotId", "serviceId"
]), (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let body = JSON.stringify(req.body);

    Booking.createBooking(token, body, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.patch('/:id', (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.deleteReservation(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.put('/:id', (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let body = JSON.stringify(req.body);

    Booking.changeReservation(token, body, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/current', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let query = req.query

    Booking.current(token, query)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/concluded', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let query = req.query

    Booking.concluded(token, query)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/canceled', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let query = req.query

    Booking.canceled(token, query)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/user/current', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getUserReservationsCurrent(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/user/concluded', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getUserReservationsConcluded(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/slot/:id', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getSlots(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/store/:id/statistics', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.bookingsDay(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

module.exports = router;
