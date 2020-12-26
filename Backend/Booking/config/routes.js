const express = require('express');
const app = express.Router();

// Index Route
app.use('/', require('../app/routes/api/index'));
app.use('/booking', require('../app/routes/api/booking'))

module.exports = app;