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
const Catalog = require('../../services/Stores/catalog');


router.get('/store/:id', (req, res) => {
    Catalog.getByStore(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: is store admin
router.post('/store/:id', validator([
    "product", "price", "abstract"
]), (req, res) => {
    let body = JSON.stringify(req.body);
    Catalog.addCatalog(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: is store admin
router.delete('/store/:id', (req, res) => {
    Catalog.deleteCatalog(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));

});

router.delete('/store/item/:id', (req, res) => {
    Catalog.deleteCatalogItem(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));

});
module.exports = router;