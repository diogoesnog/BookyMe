const express = require('express');
const app = express.Router();
// Swagger API Documentation
const swaggerUI = require('swagger-ui-express');

// Index Route
// app.use('/', require('../app/routes/api/index'));
// app.use('/user', require('../app/routes/api/user'));
// Documentation
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(require('./swagger')));

app.use('/stores', require('../app/routes/api/store'));

module.exports = app;