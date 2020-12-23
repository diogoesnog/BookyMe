
const express = require('express');
const app = express.Router();
// Swagger API Documentation
const swaggerUI = require('swagger-ui-express');
const docs = require('./swagger');

// API v1 Routes
app.use('/users', require('../app/routes/api/user'));

app.use('/stores', require('../app/routes/api/store'));
app.use('/catalog', require('../app/routes/api/catalog'));

// Documentation
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(docs));

module.exports = app;