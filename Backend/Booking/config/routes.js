const express = require('express');
const app = express.Router();

// Index Route
app.use('/', require('../app/routes/api/index'));
app.use('/booking', require('../app/routes/api/booking'));
app.use('/slot', require('../app/routes/api/slot'));

module.exports = app;
