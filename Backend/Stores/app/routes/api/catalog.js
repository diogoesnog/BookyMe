const express = require('express');
const app = express.Router();
const Catalogs = require('../../controllers/catalogs');
const Response = require('rapid-status');
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.get('/store/:storeID', async (req, res) => {

    
    let response;
    Catalogs.getCatalog(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store catalog');
            res.status(response.status).jsonp(response);
    });


});

app.post('/:storeID', async (req, res) => {
    let response;

    const catalog = {
        storeID: req.params.storeID,
        product: req.body.product,
        price: req.body.price,
        abstract: req.body.abstract,
    }

    Catalogs.insertCatalog(catalog)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not update your store catalog');
            res.status(response.status).jsonp(response);
        });
});



app.delete('/store/:storeID', async (req, res) => {

    
    let response;
    Catalogs.removeStoreCatalogs(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete your store catalog');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id', async (req, res) => {

    
    let response;
    Catalogs.removeCatalog(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete your requested catalog');
            res.status(response.status).jsonp(response);
    });


});


module.exports = app;