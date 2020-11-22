const express = require('express');
const app = express.Router();

// Index Route
app.use('/', require('../app/routes/api/index'));
app.use('/catalog', require('../app/routes/api/catalog'));

module.exports = app;