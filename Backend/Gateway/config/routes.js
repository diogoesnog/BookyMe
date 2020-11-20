
const express = require('express');
const app = express.Router();
// Swagger API Documentation
const swaggerUI = require('swagger-ui-express');

// Index Route
// Documentation
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(require('./swagger')));

// app.use('/stores', require('../app/routes/api/store'));
app.use('/users', require('../app/routes/api/user'));

module.exports = app;