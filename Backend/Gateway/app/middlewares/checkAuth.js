const Response = require('rapid-status');
const User     = require('../services/User/users');

module.exports = async (req, res, next) => {

    try {
        let authorization = req.headers.authorization || req.headers.Authorization;
        let response;

        if(authorization) {
            let response = await User.validateToken(authorization);

            if(response.status === 200) {
                req.user = response.data["data"];
                next();

            } else {
                res.status(response.status || 500).jsonp(response);
            }

        } else {
            // Authorization header not provided
            response = Response.TOKEN_REQUIRED(null, "An Authorization token must be provided to access this endpoint.");

            res.status(response.status).jsonp(response);
        }
    } catch (err) {
        res.status(err.status || 500).jsonp(err);
    }

}