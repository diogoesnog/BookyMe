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

    Booking.getStoreReservations(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.get('/user', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getUserReservations(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.get('/popular', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.getPopularStores(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// Store ID
// TODO: Reserva da loja, a ser alterado
router.post('/:id', (req, res) => {

});


router.delete('/:id', (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Booking.deleteReservation(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: Alteração da reserva, a ser alterado
router.put('/:id', (req, res) => {

});

module.exports = router;