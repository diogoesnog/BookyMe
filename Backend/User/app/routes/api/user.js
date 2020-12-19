const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var multer  = require('multer');
var upload = multer({ dest: './app/public/avatar' });
const fs = require('fs');
const Users = require('../../controllers/users');
const Response = require('rapid-status');
const checkAuth = require('../../middlewares/checkAuth');


/**
 * Register a new username
 * {body.name}: STRING,
 * {body.username}: STRING,
 * {body.email}: STRING,
 * {body.address}: STRING,
 * {body.city}: STRING,
 * {body.zipCode}: STRING,
 * {body.password}: STRING
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
 * {body.email}: STRING,
 * {body.password}: STRING
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
 * Updates user's information
 * {body.name}: STRING,
 * {body.username}: STRING,
 * {body.email}: STRING,
 * {body.address}: STRING,
 * {body.city}: STRING,
 * {body.zipCode}: STRING,
 * {header.Authorization}: TOKEN
 */
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
 * Updates user's password
 * {body.password}: STRING,
 * {body.newPassword}: STRING
 * {header.Authorization}: TOKEN
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


// TODO: check path
/**
 * Upload user's avatar
 * {file.avatar} : FILE,
 * {header.Authorization} : TOKEN
 */
router.post('/avatar', checkAuth, upload.single('avatar'), (req,res) => {
       let userID = req.decodedUser.id;
       let path = req.file.path.replace("",'/');
        console.log(path);
        // let oldPath = __dirname + req.file.path;
       let newPath = __dirname + "uploads\\\\" + userID + req.file.originalname;
        console.log(req.file);
       /*
       fs.rename(oldPath,newPath, (err)=>{
           if (err) {
               response = Response.INTERNAL_ERROR(err, "Enable to rename file");
               res.status(response.status).jsonp(response);
           }
       })
   */

    Users.updatePhoto(userID, newPath).
        then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        });
});

///////////////////////////////////////////////////Favorites\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Add new favorite to user's favorites version 1
 * {body.favorite} : STRING
 * {header.Authorization} : TOKEN
 */
router.post('/favorite', checkAuth, (req, res) => {
    let userId = req.decodedUser.id;
    let favorite = req.body.favorite;

    Users.addFavorite(userId, favorite).
    then(data => {
        response = Response.CREATED(data);
        res.status(response.status).jsonp(response);
    }).catch(err => {
        response = Response.INTERNAL_ERROR(err, "Enable to add new favorite!");
        res.status(response.status).jsonp(response);
    });
});

/**
 * Delete favorite de todos os users
 * {param.idLoja}
 */


/**
 * Retrieves all user's favorites
 * {header.Authorization}: TOKEN
 */
router.get('/favorites', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.CREATED(data.favorites);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err);
            res.status(response.status).jsonp(response);
        })
});



///////////////////////////////////////////////////Reviews\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Delete review
 * {param.idLoja}
 */

/*
 * Add new review to user's reviews version 1
 * {body.review} : STRING,
 * {header.Authorization} : TOKEN
 */
router.post('/review', checkAuth, (req, res) => {
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
 * Retrieves all user's reviews
 * {header.Authorization}: TOKEN
 */
router.get('/reviews', checkAuth, async (req, res) => {
    let userID = req.decodedUser.id;

    Users.findById(userID)
        .then(data => {
            response = Response.CREATED(data.reviews);
            res.status(response.status).jsonp(response);
        }).catch(err => {
        response = Response.INTERNAL_ERROR(err);
        res.status(response.status).jsonp(response);
    })
});


///////////////////////////////////////////////////Bookings\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Add new booking to user's bookings
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



///////////////////////////////////////////////////Stores\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/**
 * Add new store to user's stores
 * {body.store} : STRING
 * {header.Authorization} : TOKEN
 */
router.post('/store', checkAuth, (req, res) => {
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
 * Retrieves all user's bookings
 * {header.Authorization}: TOKEN
 */
router.get('/stores', checkAuth, (req, res) => {
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
 * Verify if the user is the owner of the given store
 * {body.store}: STRING.
 * {header.Authorization}: TOKEN
 */
router.get('/storeOwner', checkAuth, (req, res) => {
    let userID = req.decodedUser.id;
    let storeId = req.body.store;

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

/************************************************************************************************/
// TODO: delete findALL and users endpoint after development
/**
 * Finds and retrieves all users
 */
router.get('/findAll', (req, res) => {
    Users.getUsers()
        .then(data => {res.status(201).jsonp(data);})
        .catch(err => {res.status(500).jsonp(err);})
});


/**
 * Delete all user's documents
 */
router.delete('/users', (req,res) => {
    Users.deleteAll()
        .then(data => {res.status(201).jsonp(data);})
        .catch(err => {res.status(500).jsonp(err);})
});


/**
 *  Test if Authorization Token is correct
 *  {header.Authorization}: TOKEN
 */
router.get('/validation', checkAuth, (req, res) => {

    let response = Response.OK(req.decodedUser, "Authorized");

    res.status(response.status).jsonp(response);

});

/**
 * Verifica se utilizador é dono da store
 */

module.exports = router;