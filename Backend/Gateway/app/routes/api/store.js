const express = require('express');
const router = express.Router();
const Store = require('../../services/Stores/stores');
const { validator } = require('../../middlewares/checkBody');
const MulterFiles = require('../../utils/MulterFiles');
const uploader = new MulterFiles('stores');
const upload = uploader.getUploader();
const fs = require('fs');
const checkAuth = require("../../middlewares/checkAuth");

router.get('/popular', checkAuth, (req, res) => {
    Store.getPopular()
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: move this endpoint to user endpoint
// 1. By User Id
// 2. Fetch favorites array
// 3. Per entry, get stores information
router.get('/favourtes/:id', (req, res) => {
    Store.userFavorites(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.get('/categories', (req, res) => {
    Store.getCategories()
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

/**
 * @swagger
 * /stores:
 *  get:
 *      description: Endpoint to fetch all stores
 *      tags:
 *          - Stores
 *      consumes:
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *
 */
router.get('/', checkAuth, (req, res) => {
    Store.getAll()
        .then(response => {
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err.data);
        })
});

/**
 * @swagger
 * /stores:
 *  post:
 *      description: Endpoint to create new stores. Blocked from regular users.
 *      tags:
 *          - Stores
 *      consumes:
 *          - "application/json"
 *      produces:
 *          - "application/json"
 *      parameters:
 *        - in: body
 *          name: Store
 *          description: New Store Information's
 *          schema:
 *              type: Object
 *              required:
 *                  - name
 *                  - category
 *                  - description
 *                  - address
 *              properties:
 *                  name:
 *                      type: string
 *                  category:
 *                      type: string
 *                  description:
 *                      type: string
 *                  address:
 *                      type: string
 *
 */
router.post('/', validator([
    "name", "category", "description", "address"
]),(req, res) => {
    let body = JSON.stringify(req.body);

    Store.create(body)
        .then(response => {
            console.log("201");
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            console.log("Some Error");
            res.status(err.status || 500).jsonp(err.data || {});
        });
});

// TODO: change to put
router.post('/:id/logo', upload.single('file'), async (req, res) => {
    let response;
    try {
        response = await Store.uploadLogo(req.params.id, req.file);

        console.log("Unlink File", req.file.path);

        res.status(response.status).jsonp(response);

    } catch (err) {

        res.status(err.status || 500).jsonp(err);
    }
});

// TODO: test this endpoint
router.post('/:id/picture', upload.single('file'), async (req, res) => {
    let response
    try {
        response = await Store.uploadPicture(req.params.id, req.file);

        console.log("Unlink File", req.file.path);

        res.status(response.status).jsonp(response);

    } catch (err) {
        res.status(response.status || 500).jsonp(err);
    }

});


// TODO: finish this endpoint
router.post('/:id/photos', upload.array('files'), async (req, res) => {

    res.status(501).send("Yet to be implemented");
});

// TODO: test this endpoint
router.post('/:id/schedule', validator([
    "day", "openingHour", "closingHour"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    Store.insertSchedule(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null))

});


// TODO: test this endpoint
router.patch('/:id/description', validator([
    "description"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    Store.updateDescription(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: test this endpoint
router.patch('/:id/address', validator([
    "address"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    Store.updateAddress(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

// TODO: test this endpoint
router.patch('/:id/phone', validator([
    "phone"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    Store.updatePhone(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
})

router.post('/:id/coordinates', validator([
    "lat", "long"
]), (req, res) => {
    let body = JSON.stringify(req.body);

    Store.addCoordinates(req.params.id, body)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

router.delete('/:id', (req, res) => {

    Store.deleteOne(req.params.id)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});


// TODO: test this endpoint
router.delete('/:id/photos/:photo', (req, res) => {

    Store.deletePhoto(req.params.id, req.params.photo)
        .then(response => res.status(response.status).jsonp(response.data))
        .catch(err => res.status(err.status || 500).jsonp(err.data || null));
});

module.exports = router;