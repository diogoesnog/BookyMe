const express = require('express');
const app = express.Router();

// Index Route
// app.use('/', require('../app/routes/api/index'));
// app.use('/user', require('../app/routes/api/user'));
app.use('/stores', require('../app/routes/api/store'));

module.exports = app;