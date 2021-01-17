const express = require('express');
const app = express.Router();
const Stores = require('../../controllers/stores');
const Response = require('rapid-status');
const fs = require('fs');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fetch = require('node-fetch');
const checkAuth = require('../../middlewares/checkAuth');
const Service = require('../../services/users');

/**
 * Get Stores
 */

app.get('/popular', (req,res) => {

    Stores.getBestStores(req.query.category)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch working days...');
            res.status(response.status).jsonp(response);
    });

})

app.get('/calendar', (req,res) => {

    Stores.getCalendar()
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch working days...');
            res.status(response.status).jsonp(response);
    });

})

app.get('/favorites', checkAuth, (req, res) => {
    console.log("req.user");
    Stores.findByArrayId(req.user.favorites)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch favorites.');
            res.status(response.status).jsonp(response);
        });
});

app.get('/admin', checkAuth, (req, res) => {
    console.log(req.user);

    Stores.findByArrayId(req.user.stores)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch favorites.');
            res.status(response.status).jsonp(response);
    });
});

app.get('/schedule', (req,res) => {

    let day = req.query.day
    let storeID = req.query.storeId
    
    Stores.getSchedule(storeID, day)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch schedule for the desired day');
            res.status(response.status).jsonp(response);
    });
})

app.get('/categories/results',  (req, res) => {

    Stores.getCategoriesResults()
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch categories');
            res.status(response.status).jsonp(response);
    });

});

app.get('/:category/ratings',  (req, res) => {

    Stores.getCategoryRatings(req.params.category)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch categories');
            res.status(response.status).jsonp(response);
    });
});

app.get('/categories',  (req, res) => {

    Stores.getCategories()
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch categories');
            res.status(response.status).jsonp(response);
    });
});


app.get('/recommended',  (req, res) => {

    Stores.getRecommended()
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch categories');
            res.status(response.status).jsonp(response);
    });
});

app.get('/', (req, res) => {

    let response;
    let term = req.query.search
    filters = {}

    for (var propName in req.query) {
        if (req.query.hasOwnProperty(propName)) {
            if (propName != 'search'){
                filters[propName] = req.query[propName]
            }
        }
    }
    Stores.getResults(filters, term)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch stores');
            res.status(response.status).jsonp(response);
    });
});

app.get('/:id',  (req, res) => {

    Stores.getStore(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch stores');
            res.status(response.status).jsonp(response);
    });
});





// TODO: protection middleware
/**
 * Create a store
 * name: String,
 * category: String,
 * description: String,
 * address: String
 */
app.post('/', checkAuth, async (req, res) => {
    let response;

    try {
        let token = req.headers.authorization || req.headers.Authorization;
        /*const address = {
            place: req.body.place,
            zipcode: req.body.zipcode,
            city: req.body.city,
            country: req.body.country
        }*/

        const store = {
            name: req.body.name,
            verified: false,
            category: req.body.category,
            description: req.body.description,
            address: {
                place: req.body.place,
                zipcode: req.body.zipcode,
                city: req.body.city,
                country: req.body.country
            }
        };

        let storeData = await Stores.create(store);

        await Service.addStore(token, storeData._id);

        response = Response.CREATED(storeData);
        res.status(response.status).jsonp(response);
    } catch(e) {
        response = Response.INTERNAL_ERROR(e, 'Could not create your store!');
        res.status(response.status).jsonp(response);

    }

    /*Stores.create(store)
        .then(data => {

            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not create your store!');
            res.status(response.status).jsonp(response);
        });*/
});


app.post('/:id/logo', upload.single('logo'),  (req, res) => {
    let response;

    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/logos/' + req.params.id + req.file.originalname 

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
    })

    let imagePath = '/public/logos/' + req.params.id + req.file.originalname

    const logo = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: imagePath
    }

    Stores.editLogo(req.params.id, logo)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not update your logo');
            res.status(response.status).jsonp(response);
        });
});

app.post('/:id/picture', upload.single('picture'),  (req, res) => {
    let response;
    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/pictures/' + req.params.id + req.file.originalname

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
        })

        let imagePath = '/public/pictures/' + req.params.id + req.file.originalname
        const picture = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            url: imagePath
        }

        Stores.editPicture(req.params.id, picture)
            .then(data => {
                response = Response.CREATED(data);
                res.status(response.status).jsonp(response);
            }).catch(err => {
                response = Response.INTERNAL_ERROR(err, 'Could not add the uploaded picture');
                res.status(response.status).jsonp(response);
            });
    
});

app.post('/:id/photo', upload.single('photo'),  (req, res) => {
    let response;

    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/photos/' + req.params.id + req.file.originalname

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
    })

    let imagePath = '/public/photos/' + req.params.id + req.file.originalname
    const photo = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: imagePath
    }

    Stores.addPhoto(req.params.id, photo)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not add the uploaded photos');
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
            response = Response.INTERNAL_ERROR(err, 'Could not edit the requested schedule');
            res.status(response.status).jsonp(response);
        });
});



app.put('/:id/description',  (req, res) => {
    
    des = req.body.description

    Stores.editDescription(req.params.id,des)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not edit the requested description');
            res.status(response.status).jsonp(response);
    });


});


app.put('/:id/phone',  (req, res) => {
    
    let phone = req.body.phone 

    Stores.editPhone(phone, req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not edit the requested address');
            res.status(response.status).jsonp(response);
    });


});

app.put('/:id/coordinates',  (req, res) => {
    
    let { lat, long } = req.body;

    Stores.setCoordinates(lat, long, req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not edit the requested address');
            res.status(response.status).jsonp(response);
    });


});



app.delete('/:id',  (req, res) => {
    
    Stores.removeStore(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete the requested store');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id/schedule/:scheduleID',  (req, res) => {
    
    Stores.removeStoreSchedule(req.params.id, req.params.scheduleID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete the requested photo');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id/photos/:photoID',  (req, res) => {
    
    Stores.removeStorePhoto(req.params.id, req.params.photoID)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete the requested photo');
            res.status(response.status).jsonp(response);
    });


});

module.exports = app;