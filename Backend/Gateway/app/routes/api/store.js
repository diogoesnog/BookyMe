const express = require('express');
const router = express.Router();
const Store = require('../../services/stores');
const { validator } = require('../../middlewares/checkBody');
const MulterFiles = require('../../utils/MulterFiles');
const uploader = new MulterFiles('stores');
const upload = uploader.getUploader();


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
router.get('/', (req, res) => {
    Store.getAll()
        .then(response => {
            res.status(response.status).jsonp(response.data);
        }).catch(err => {
            res.status(err.status).jsonp(err);
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
router.post('/:id/logo', upload.single('file'),(req, res) => {

    throw new Error("Oops");

});

module.exports = router;