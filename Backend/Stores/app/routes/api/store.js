const express = require('express');
const app = express.Router();
const Stores = require('../../controllers/stores');
const Response = require('rapid-status');

app.get('/', (req, res) => {

    Stores.get()
        .then(data => {
            let response = Response.OK(data);

            res.status(response.status).jsonp(response);
        }).catch(err => {
            let response = Response.INTERNAL_ERROR(err, 'Could not fetch stores');
            res.status(response.status).jsonp(response);
    });

});

// TODO: protection middleware
app.post('/', (req, res) => {

    const store = {
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
    };


    Stores.create(store)
        .then(data => {
            res.status(201).jsonp(data);
        }).catch(err => {
            res.status(500).jsonp(err);
        });
});

module.exports = app;