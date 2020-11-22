const express = require('express');
const router = express.Router();
const http = require('wretch');
const User = require('../../services/users');
const { validator } = require('../../middlewares/checkBody');

router.post('/register', validator([
    "name", "username", "email", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.register(body)
        .then(response => {
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err.data);
        });
});

router.post('/login', validator([
    'email', 'password'
]), (req, res) => {
    let body = req.body;

    User.login(body)
        .then(data => {
            res.setHeader('Authorization', data.cookies[0]);
            res.status(data.response.status).jsonp(data.response);
        }).catch(err => {
            let status = err.status || 500;
            res.status(status).jsonp(err);
        });
});

module.exports = router;