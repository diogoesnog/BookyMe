const express = require('express');
const router = express.Router();
const User = require('../../services/users');
const { validator } = require('../../middlewares/checkBody');
const checkAuth = require('../../middlewares/checkAuth');

/**
 * @swagger
 * /users/register:
 *   post:
 *     description: Use to create a new account
 *     tags:
 *        - User
 *     consumes:
 *        - "application/json"
 *     produces:
 *        - "application/json"
 *     parameters:
 *        - in: body
 *          name: user
 *          description: User information's
 *          schema:
 *              type: Object
 *              required:
 *                  - name
 *                  - username
 *                  - email
 *                  - address
 *                  - city
 *                  - zipCode
 *                  - password
 *              properties:
 *                  name:
 *                      type: string
 *                  username:
 *                      type: string
 *                  email:
 *                      type: string
 *                  address:
 *                      type: string
 *                  city:
 *                      type: string
 *                  zipCode:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *        '201':
 *           description: Account created successfully
 *           content:
 *              application/json
 *        '5XX':
 *            description: Server Error
 *
 */
router.post('/register', validator([
    "name", "username", "email", "address", "city", "zipCode", "password"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.register(body)
        .then(response => {
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err.data);
        });
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     description: Endpoint for User Authentication
 *     tags:
 *        - User
 *     consumes:
 *        - "application/json"
 *     produces:
 *        - "application/json"
 *     parameters:
 *        - in: body
 *          name: user
 *          description: User information's
 *          schema:
 *              type: Object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *     responses:
 *        '201':
 *           description: Successfully authenticated. A User token has been passed over headers
 *           content:
 *              application/json
 *           headers:
 *              Authentication:
 *                 schema:
 *                    type: string
 *        '5XX':
 *            description: Server Error
 *
 */
router.post('/login', validator([
    'email', 'password'
]), (req, res) => {
    let body = JSON.stringify(req.body);

    User.login(body)
        .then(response => {
            console.log(response);
            res.setHeader('Authorization', response.headers.get('authorization'));

            res.status(response.status).jsonp(response.data);
        }).catch(err => res.status(err.status).jsonp(err.data));
});

/**
 * @swagger
 * /users/account:
 *  put:
 *      description: Endpoint to update users information
 *      tags:
 *          - User
 *      consumes:
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *      parameters:
 *        - in: body
 *          name: User
 *          description: Update user full name and address
 *          schema:
 *              type: Object
 *              required:
 *                  - name
 *                  - address
 *              properties:
 *                  name:
 *                      type: string
 *                  address:
 *                      type: string
 *
 */
router.put('/account', checkAuth, validator([
    'name', 'address'
]), (req, res) => {
    let body = JSON.stringify(req.body);
    let header = {
        Authorization: req.headers.authorization || req.headers.Authorization
    }

    User.updateAccount(header, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status).jsonp(err.data));
});

router.patch('/password', checkAuth, validator([
    'oldPassword', 'newPassword'
]), (req, res) => {

    let body = JSON.stringify(req.body);
    let header = {
        Authorization: req.headers.authorization || req.headers.Authorization
    }

    User.updatePassword(header, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status).jsonp(err.data));
});

module.exports = router;