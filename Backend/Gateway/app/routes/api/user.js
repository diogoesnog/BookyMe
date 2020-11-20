const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { validator } = require('../../middlewares/checkBody');

router.post('/register', validator([
    "name", "username", "email", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    }).then(res => res.json())
        .then(json => {
            // console.log(json);
            res.status(json.status).jsonp(json);
        });
});

router.post('/login', (req, res) => {

});

module.exports = router;