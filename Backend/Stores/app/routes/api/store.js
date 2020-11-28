const express = require('express');
const app = express.Router();
const Stores = require('../../controllers/stores');
const Response = require('rapid-status');



app.get('/', async (req, res) => {

    
    let response;
    let query = req.query;
    Stores.get(query)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch stores');
            res.status(response.status).jsonp(response);
    });


});

// TODO: protection middleware
app.post('/', (req, res) => {
    let response;
    const store = {
        
        name: req.body.name,
        category: req.body.category,
        description: req.body.description
        
    };


    Stores.create(store)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});




app.post('/:id/review', (req, res) => {
    let response;

    const review = {
        username: req.body.username,
        comment: req.body.comment,
        date: req.body.date
    }


    Stores.insertReview(req.params.id, review)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});


app.post('/:id/schedule', (req, res) => {
    let response;

    const schedule = {
        day: req.body.day,
        openingHour: req.body.openingHour,
        closingHour: req.body.closingHour
    }

    Stores.insertSchedule(req.params.id, schedule)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});



module.exports = app;