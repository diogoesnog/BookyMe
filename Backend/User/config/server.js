// Express Server Framework
const express = require('express');
const app = express();
const path = require('path');

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
// Swagger API Documentation
const swaggerUI = require('swagger-ui-express');
// MongoDB
const mongoose      = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => {
        console.log("Connection to MongoDB successfully established");
    })
    .catch(() => {
        throw new Error("Could not establish connection to MongoDB");
    });

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
let publicPath = path.join(__dirname, '../app/public')
app.use('/public', express.static(publicPath) );

// Configure CORS middleware
const corsOptions = {
    origin: process.env.FRONTEND_SERVER,
    credentials: true
};

app.use(cors(corsOptions));

// Documentation
app.use('/v1/api/documentation', swaggerUI.serve, swaggerUI.setup(require('./swagger'), { explorer: true } ));
// Register Different Versions of API Routes
app.use('/v1/api', require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.jsonp({title: "Error!", message: err.message});
});

module.exports = app;