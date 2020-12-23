const express = require('express');
const app = express.Router();

// Index Route
app.use('/', require('../app/routes/api/index'));
app.use('/user', require('../app/routes/api/user'));
app.use('/review', require('../app/routes/api/review'));
app.use('/favorite', require('../app/routes/api/favorite'));
app.use('/booking', require('../app/routes/api/booking'));
app.use('/store', require('../app/routes/api/store'));


module.exports = app;