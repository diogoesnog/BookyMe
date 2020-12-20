const express = require('express');
const router = express.Router();
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');


/**
 * Retrieves all user's stores
 * {header.Authorization}: TOKEN
 */
router.get('/', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.CREATED(data.stores);
            res.status(response.status).jsonp(response);
        }).catch(err => {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    })
});

/**
 * Verifies if the user is the owner of the given storeID
 * {body.store}: STRING.
 * {header.Authorization}: TOKEN
 */
router.get('/admin/:id', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let storeId = req.params.id;

    console.log(userID, storeId);
    Users.findUserStore(userID, storeId).
    then(dataTemp => {
        let data = {
            isAdmin: dataTemp ? true: false
        }
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    });
});

/**
 * Adds new store to user's stores
 * {body.store} : STRING
 * {header.Authorization} : TOKEN
 */
router.post('/', checkAuth, (req, res) => {
    let userId = req.decodedUser.id;
    let store = req.body.store;

    Users.addStore(userId, store).
    then(data => {
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err, "Enable to add new favorite!");
        res.status(response.status).jsonp(response);
    });

});

/**
 * Deletes store
 * {param.store}: STRING,
 * {header.Authorization}: TOKEN
 */
router.delete('/', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let store = req.body.store;

    Users.deleteStore(userID, store)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        })
        .catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});




module.exports = router;