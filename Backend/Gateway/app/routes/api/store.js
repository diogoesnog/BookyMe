const express = require('express');
const router = express.Router();
const Store = require('../../services/stores');
const { validator } = require('../../middlewares/checkBody');


router.get('/', (req, res) => {
    Store.getAll()
        .then(response => {
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err);
        })
});

router.post('/', validator([
    "name", "category", "description", "address"
]),(req, res) => {
    let body = JSON.stringify(req.body);

    Store.create(body)
        .then(response => {
            console.log("201");
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            console.log("Some Error");
            res.status(err.status || 500).jsonp(err.data || {});
        });
});


module.exports = router;