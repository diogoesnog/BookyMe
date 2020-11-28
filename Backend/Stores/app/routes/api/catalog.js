const express = require('express');
const app = express.Router();
const Catalogs = require('../../controllers/catalogs');
const Response = require('rapid-status');

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

app.post('/:id', (req, res) => {
    let response;
    
    const image = {
        title: req.body.title,
        script: req.body.script,
        url: req.body.url
    }

    const catalog = {
        storeID: req.params.id,
        product: req.body.product,
        price: req.body.price,
        abstract: req.body.abstract,
        image: image
    }

    console.log(catalog)


    Catalogs.insertCatalog(catalog)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});


module.exports = app;