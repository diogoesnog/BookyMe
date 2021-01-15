const Response = require('rapid-status');
const Request = require('../utils/Request');

module.exports = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization || req.headers.Authorization;
        let response;
        const store = req.storeId || req.params.id;

        let request = new Request(`${process.env.AUTH_SERVICE}/store/admin/${store}`);

        request.setHeaders({
            authorization: authorization
        });

        if(authorization && store) {
            response = await request.get();

            if(response.status === 200) {
                if(req.user)    // req.user already exists
                    req.user["isAdmin"] = response.data["data"].isAdmin;
                else
                    req.user = response.data["data"];

                next();

            } else {
                res.status(response.status || 500).jsonp(response);
            }

        } else {
            // Authorization header not provided
            response = Response.FORBIDDEN(null, "You don't have enough permissions to access this endpoint.");
            res.status(response.status).jsonp(response);
        }
    } catch (err) {
        res.status(err.status || 500).jsonp(err);
    }
}
