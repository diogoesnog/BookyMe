const express = require('express');
const router = express.Router();
const http = require('wretch');
const User = require('../../services/users');


const { validator } = require('../../middlewares/checkBody');

router.post('/register', validator([
    "name", "username", "email", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);
    http(`${process.env.USER_SERVICE_ENDPOINT}/user/register`)
        .post(body)
        .res(response => {
            console.log("=== Success ===");
            console.log(response);
        }).catch(err => {
            console.log("=== Error === ")
            console.log(err);

    })
});

router.post('/login', validator([
    'email', 'password'
]), (req, res) => {
    let body = req.body;

    User.login(body)
        .then(data => {
            res.setHeader('Authentication', data.cookies[0]);
            res.status(data.response.status).jsonp(data.response);
        }).catch(err => {

            res.status(err.status).jsonp(err);
        });
});

module.exports = router;