const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');

/**
 * Retrieves all user's favorites
 * {header.Authorization}: TOKEN
 */
router.get('/', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.OK(data.favorites);
            res.status(response.status).jsonp(response);
        }).catch(err => {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    });
});

/**
 * Adds new favorite to user's favorites
 * {body.favorite} : STRING
 * {header.Authorization} : TOKEN
 */
router.post('/', checkAuth, (req, res) => {
    let userId = req.decodedUser.id;
    let favorite = req.body.favorite;

    Users.addFavorite(userId, favorite).
    then(dataTemp => {
        let data = dataTemp.toObject();
        delete data.password;
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err, "Enable to add new favorite!");
        res.status(response.status).jsonp(response);
    });
});


/**
 * Deletes favorite
 * {param.favorite}: STRING,
 * {header.Authorization}: TOKEN
 */
router.delete('/:id', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let favorite = req.params.id;

    Users.deleteFavorite(userID, favorite)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});


/**
 * Deletes all occurrences of given favorite for all users.
 * {body.favorite}: STRING
 */
router.delete('/many/:id', checkAuth, (req, res) => {
    let favorite = req.params.id;

    Users.deleteFavoriteUsers(favorite)
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