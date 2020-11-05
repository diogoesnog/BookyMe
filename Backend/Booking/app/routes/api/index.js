const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).jsonp({title: "Hello", message: "Welcome to the root of my REST API"});
});

module.exports = router;