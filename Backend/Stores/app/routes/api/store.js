const express = require('express');
const app = express.Router();
const Stores = require('../../controllers/stores');

app.get('/', (req, res) => {

    Stores.get()
        .then(data => {
            res.status(200).jsonp(data);
        }).catch(err => {
            res.status(500).jsonp(err);
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