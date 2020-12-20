const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');


/**
 * Deletes booking
 * {param.booking}: STRING,
 * {header.Authorization}: TOKEN
 */
router.delete('/booking', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let booking = req.body.booking;

    Users.deleteBooking(userID, booking)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        })
})


/**
 * Adds new booking to user's bookings
 * {body.booking} : STRING
 * {header.Authorization} : TOKEN
 */
router.post('/booking', checkAuth,  (req, res) => {
    let userId = req.decodedUser.id;
    let booking = req.body.booking;

    Users.addBooking(userId, booking).
    then(data => {
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err, "Enable to add new favorite!");
        res.status(response.status).jsonp(response);
    });

});


/**
 * Retrieves all user's bookings
 * {header.Authorization}: TOKEN
 */
router.get('/bookings', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.CREATED(data.bookings);
            res.status(response.status).jsonp(response);
        }).catch(err => {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    })
});

module.exports = router;