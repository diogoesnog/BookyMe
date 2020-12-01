const express = require('express');
const router = express.Router();
const Store = require('../../services/stores');
const { validator } = require('../../middlewares/checkBody');


router.get('/', (req, res) => {
    Store.getAll()
        .then(response => {
            res.status(response.status).jsonp(response);
        }).catch(err => {
            res.status(err.status).jsonp(err);
        })
});

router.post('/:id', validator([
    "product", "price", "abstract"
]), (req, res) => {
    let id = req.params.id;



});

module.exports = router;