const Response = require('rapid-status');

module.exports = (req, res, next) => {

    let authorization = req.headers.authorization || req.headers.Authorization;
    let response;
    if(authorization) {
        // TODO: Get User ID from AuthServer

        // TODO: Check Token validation

        // TODO: Next
        next();
    } else {
        // Authorization header not provided
        response = Response.TOKEN_REQUIRED(null, "An Authorization token must be provided to access this endpoint.");

        res.status(response.status).jsonp(response);
    }
}