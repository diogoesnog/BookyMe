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
    let body = JSON.stringify(req.body);

    User.login(body)
        .then(response => {
            console.log(response);
            res.setHeader('Authorization', response.headers.get('authorization'));

            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err.data);
        });
});

module.exports = router;