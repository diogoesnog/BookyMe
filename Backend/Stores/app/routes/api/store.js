const express = require('express');
const app = express.Router();
const Stores = require('../../controllers/stores');
const Response = require('rapid-status');
const fs = require('fs');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })



app.get('/', async (req, res) => {

    
    let response;
    let query = req.query;
    Stores.get(query)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not fetch stores');
            res.status(response.status).jsonp(response);
    });


});

// TODO: protection middleware
app.post('/', (req, res) => {
    let response;
    const store = {
        
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        address: req.body.address
        
    };


    Stores.create(store)
        .then(data => {
            response = Response.CREATED(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not create your store!');
            res.status(response.status).jsonp(response);
        });
});


app.post('/:id/logo', upload.single('logo'), async (req, res) => {
    let response;

    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/logos/' + req.params.id + req.file.originalname 

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err
    })

    const logo = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: newPath
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

app.post('/:id/picture', upload.single('picture'), async (req, res) => {
    let response;
    let oldPath = __dirname + '/../../../' + req.file.path
    let newPath = __dirname + '/../../public/pictures/' + req.params.id + req.file.originalname

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
        })

        const picture = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            url: newPath
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

app.post('/:id/photos', upload.array('photo'), async (req, res) => {
    let response;
    var photos = []
    for(let i=0; i < req.files.length; i++){
        let oldPath = __dirname + '/../../../' + req.files[i].path
        let newPath = __dirname + '/../../public/photos/' + req.params.id + req.files[i].originalname

        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err
        })
        const photo = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            url: newPath
        }

        photos.push(photo)
    }

        Stores.addPhoto(req.params.id, photos)
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



app.post('/:id/description', async (req, res) => {
    
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

app.post('/:id/address', async (req, res) => {
    
    add = req.body.address

    Stores.editAddress(req.params.id, add)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not edit the requested address');
            res.status(response.status).jsonp(response);
    });


});


app.delete('/:id', async (req, res) => {
    
    Stores.removeStore(req.params.id)
        .then(data => {
            response = Response.OK(data);
            res.status(response.status).jsonp(response);
        }).catch(err => {
            response = Response.INTERNAL_ERROR(err, 'Could not delete the requested store');
            res.status(response.status).jsonp(response);
    });


});

app.delete('/:id/photos/:photoID', async (req, res) => {
    
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