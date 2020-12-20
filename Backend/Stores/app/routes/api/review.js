const express = require('express');
const app = express.Router();
const Reviews = require('../../controllers/reviews');
const Response = require('rapid-status');




app.get('/:storeID/ratings',  (req, res) => {

    
    let response;
    Reviews.getRatings(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store ratings');
            res.status(response.status).jsonp(response);
    });


});


app.get('/store/:storeID',  (req, res) => {

    
    let response;
    Reviews.getReviews(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch store reviews');
            res.status(response.status).jsonp(response);
    });


});

app.post('/:storeID', (req, res) => {
    let response;

    let date = new Date()

    const review = {
        storeID: req.params.storeID,
        userId: req.body.userId,
        comment: req.body.comment,
        rating: req.body.rating,
        date: date.toISOString()
    }

   
    Reviews.insertReview(review)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not post your review');
            res.status(response.status).jsonp(response);
        });
});

app.delete('/store/:storeID',  (req, res) => {

    
    let response;
    Reviews.removeStoreReviews(req.params.storeID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete your store related reviews');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id',  (req, res) => {

    
    let response;
    Reviews.removeReview(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete your requested review');
            res.status(response.status).jsonp(response);
    });


});


module.exports = app;