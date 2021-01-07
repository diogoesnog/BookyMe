// Express Server Framework
const express = require('express');
const app = express();

const Response = require('rapid-status');

// Server Addons
// Parsers
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// HTTP Errors
const createError = require('http-errors');
// Request Logger
const logger = require('morgan');
// CORS Middleware
const cors = require('cors');

// Dev or Production
const env = process.argv[2];
if(env === 'dev') {
    app.use( logger(env) );
} else {
    console.log = function() { /* Do NOTHING */ }
}
// Parse Body Requests to JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use Cookies
app.use(cookieParser());

// Public Files location
app.use(express.static('./app/public'));

// Configure CORS middleware to expose Authorization header
const corsOptions = {
    credentials: true,
    exposedHeaders: 'Authorization',
};

app.use( cors(corsOptions) );

// app.use((req, res, next) => setTimeout(next, Math.floor( ( Math.random() * 2000 ) + 100 ) ));

// Register Different Versions of API Routes
app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    console.log("Error Handler");
    console.log(err.message);

    let response = Response.INTERNAL_ERROR(env === "dev" ? err : null, err.message);

    res.status(response.status);
    res.json(response);

});

module.exports = app;
