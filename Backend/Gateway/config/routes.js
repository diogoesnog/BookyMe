const express = require('express');
const app = express.Router();

// API v1 Routes
app.use('/users', require('../app/routes/api/user'));

app.use('/stores', require('../app/routes/api/store'));
app.use('/catalog', require('../app/routes/api/catalog'));

app.use('/booking', require('../app/routes/api/booking'));

// Documentation
app.get('/documentation', (req, res) => res.jsonp({title: "Deprecated", message: "Use Insomnia JSON file instead."}));

module.exports = app;