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
const Review = require('../../services/Stores/reviews');

router.get('/:id/ratings', (req, res) => {
    // let body = JSON.stringify(req.body);
    let token = req.headers.Authorization || req.headers.authorization;

    Review.getRatings(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


router.get('/store/:id', (req, res) => {
    let token = req.headers.Authorization || req.headers.authorization;

    Review.getReviews(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.post('/store/:id', validator([
    "comment", "rating"
]), (req, res) => {
    let body = JSON.stringify(req.body);
    let token = req.headers.Authorization || req.headers.authorization;

    Review.getRatings(token, req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

/**
 * Remove all Reviews
 */
router.delete('/store/:id', (req, res) => {
    Review.deleteAllReview(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.delete('/:id', (req, res) => {
    Review.deleteReview(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
})


module.exports = router;