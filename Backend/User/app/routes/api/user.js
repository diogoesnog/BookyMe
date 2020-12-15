const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');

router.get('/', (req, res) => {

    /**
     * Uma API REST pode apresentar recursos sobre formas de filtros. Para não criar novas
     * rotas num endpoint devemos, sempre que possível, fazer uso de query strings.
     * Estas queries strings vêm sempre após o ponto de interrogação e separadas entre &
     * Um exemplo prático, listar os utilizadores ordenados pelo username ascendente
     * http://localhost:3000/v1/api/user?username=asc
     * Podemos aceder a esta query string no request (req), na property query
     */

    const queries = req.query;

    res.status(200).json({title: "Title", message: "Some message...", queries: queries});
});

/**
 * Register a new username
 */
router.post('/register', (req, res) => {
    let response;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) console.log(err);

        const user = req.body;
        user.password = hash;

        Users.createUser(user)
        .then(dataTemp => {
            let data = dataTemp.toObject()
            delete data.password
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        })
        .catch( err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
    })
});

/**
 * Authenticate a user
 */
router.post('/authentication', async (req, res) => {
    let response;
    const userAuth = {
        email: req.body.email,
        password: req.body.password
    };

    try {
        let user = await Users.searchWithEmailOrUsername(userAuth.email);

        if(!user) {
            response = Response.UNAUTHORIZED(undefined, `${userAuth.email} does not match our records`);
            res.status(response.status).jsonp(response);
        }
        else {
            let result = await bcrypt.compare(userAuth.password, user.password);

            if (!result){
                response = Response.UNAUTHORIZED(undefined, 'Invalid credentials');
                res.status(response.status).jsonp(response);
            }
            else {
                const token = jwt.sign({ user: user._id }, process.env.AUTH_SECRET,
                    {expiresIn: process.env.AUTH_TOKEN_TIMETOLIVE},
                    {algorithm: process.env.AUTH_TOKEN_ALGORITHM});

                res.setHeader('Authorization', token);

                response = Response.CREATED({
                    user: {
                        email: user.email,
                        username: user.username,
                        name: user.name,
                        address: user.address,
                        city: user.city,
                        zipCode: user.zipCode,
                        favorites: user.favorites,
                        avatar: user.avatar,
                        reviews: user.reviews,
                        bookings: user.bookings,
                        type: user.type,
                        stores: user.stores
                    }
                });
            }
        }
        res.status(response.status).jsonp(response);
    } catch(err){
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})


/**
 *  TODO: validateToken
 *  Rota que testa se o token esta valido -> get
 *  Resposta -> user -> tudo menos a pass
 *  token -> headers
 */
router.get('/validation', checkAuth, (req, res) => {

    let response = Response.OK(req.decodedUser, "Authorized");

    res.status(response.status).jsonp(response);

});


router.put('/account',checkAuth, async (req, res) => {
    let response;
    let userAuth = {
        id: req.decodedUser.id,
        password: req.body.password
    };


    let newInfo = {
        name: req.body.name,
        username: req.body.username,
        address: req.body.address,
        email: req.body.email,
        city: req.body.city,
        zipCode: req.body.zipCode
    }
    try{
        let user = await Users.findById(userAuth.id);

        let result = await bcrypt.compare(userAuth.password, user.password);

        if (!result){
            response = Response.UNAUTHORIZED(undefined, 'Invalid credentials');
            res.status(response.status).jsonp(response);
        }
        else {
            Users.updateInfo(newInfo, userAuth.id).
                then(dataTemp => {
                    let data = dataTemp.toObject();
                    delete data.password;
                    response = Response.ACCEPTED(data);
                    res.status(response.status).jsonp(response);
                }).
                catch(err => {
                    response = Response.INTERNAL_ERROR(err);
                    res.status(response.status).jsonp(response);
                });
        }
    } catch (err) {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})

/**
 * Update user's password
 */
router.patch('/password', checkAuth, async (req, res) => {
    let response;

    let userAuth = {
        id: req.decodedUser.id,
        password: req.body.password,
        newPassword: req.body.newPassword
    };

    try{
        let user = await Users.findById(userAuth.id);

        let result = await bcrypt.compare(userAuth.password, user.password);

        if (!result) {
            response = Response.UNAUTHORIZED(undefined, 'Invalid credentials');
            res.status(response.status).jsonp(response);
        }
        else {
            bcrypt.hash(userAuth.newPassword, 10, (err, hash) => {
                if (err) console.log(err);

                Users.updatePassword(userAuth.id, hash).
                    then(dataTemp => {
                        let data = dataTemp.toObject();
                        delete data.password;
                        response = Response.ACCEPTED(data);
                        res.status(response.status).jsonp(response);
                    }).catch(err => {
                        response = Response.INTERNAL_ERROR(err);
                        res.status(response.status).jsonp(response);
                    })
            })
        }
    } catch(err){
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    }
})

/**
 * Returns all users in db
 * Only for test purpose
 * TODO: delete this endpoint after development
 */
router.get('/findAll', (req, res) => {
    Users.getUsers()
        .then(data => {res.status(201).jsonp(data);})
        .catch(err => {res.status(500).jsonp(err);})
});

router.delete('/users', (req,res) => {
    Users.deleteAll()
        .then(data => {res.status(201).jsonp(data);})
        .catch(err => {res.status(500).jsonp(err);})
})

module.exports = router;