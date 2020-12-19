const express = require('express');
const router = express.Router();
const Store = require('../../services/Stores/stores');
const { validator } = require('../../middlewares/checkBody');
const MulterFiles = require('../../utils/MulterFiles');
const uploader = new MulterFiles('stores');
const upload = uploader.getUploader();
const fs = require('fs');
const checkAuth = require("../../middlewares/checkAuth");


module.exports = router;