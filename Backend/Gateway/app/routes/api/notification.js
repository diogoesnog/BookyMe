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
const Notification = require('../../services/notifications');


router.get('/', checkAuth, (req, res, next) => {
    let token = req.headers.authorization || req.headers.Authorization;

    Notification.getInbox(token)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/', checkAuth, validator([
    "storeId", "userId", "message"
]), (req, res) => {

    let body = JSON.stringify(req.body);
    let token = req.headers.authorization || req.headers.Authorization;

    Notification.notify(token, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.patch('/:id', checkAuth, (req, res) => {
    let token = req.headers.authorization || req.headers.Authorization;

    Notification.markAsRead(token, req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

module.exports = router;