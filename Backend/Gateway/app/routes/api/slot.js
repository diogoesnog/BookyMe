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
const Slot = require('../../services/Booking/slot');

router.get('/store/:id', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Slot.getSlotStore(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/store/:id', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;
    let body = JSON.stringify(req.body);

    Slot.newSlotStore(token, req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.delete('/:id', checkAuth, (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Slot.deleteSlot(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

module.exports = router;
