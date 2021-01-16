const express = require('express');
const app = express.Router();

// Index Route
app.use('/notification', require('../app/routes/api/index'));

module.exports = app;