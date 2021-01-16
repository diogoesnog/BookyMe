const express = require('express');
const router = express.Router();
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');
const Notifications = require('../../controllers/notifications');

router.get('/', checkAuth, (req, res, next) => {
    let userId = req.user.id;
    let read = req.query.read === "true" ? true : false;

    Notifications.getUserNotifcations(userId, read)
        .then(data => {
            let response = Response.OK(data);

            res.status(response.status).jsonp(response);
        }).catch(err => {
            let response = Response.INTERNAL_ERROR(err, `Could not fetch ${req.user.username} notifications...`);
            res.status(response.status).jsonp(response);
        })
});

router.post('/', checkAuth, (req, res) => {

    Notifications.publish(req.body, req.user.id)
        .then(data => {
            let response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            let response = Response.INTERNAL_ERROR(err, `Could not fetch ${req.user.username} notifications...`);
            res.status(response.status).jsonp(response);
        });
});

router.patch('/:id', checkAuth, (req, res) => {
    Notifications.markRead(req.params.id, req.user.id)
        .then(data => {
            let response = data === null ? Response.NO_CONTENT(null, "Already updated") : Response.CREATED(data);

            res.status(response.status).jsonp(response);
        }).catch(err => {
            let response = Response.INTERNAL_ERROR(err, `Could not mark notification as read...`);
            res.status(response.status).jsonp(response);
        });
});



module.exports = router;