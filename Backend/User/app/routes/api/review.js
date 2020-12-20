const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');


/**
 * Retrieves all user's reviews
 * {header.Authorization}: TOKEN
 */
router.get('/', checkAuth, async (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.OK(data.reviews);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
    });
});

/*
 * Adds new review to user's reviews
 * {body.review} : STRING,
 * {header.Authorization} : TOKEN
 */
router.post('/', checkAuth, (req, res) => {
    let userId = req.decodedUser.id;
    let review = req.body.review;

    Users.addReview(userId, review).
    then(data => {
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err, "Enable to add new favorite!");
        res.status(response.status).jsonp(response);
    });
});

/**
 * Deletes review
 * {param.review}: STRING,
 * {header.Authorization}: TOKEN
 */
router.delete('/:id', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let review = req.params.review;

    Users.deleteReview(userID, review)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});





module.exports = router;