const Request = require('../utils/Request');
module.exports = (req, res, next) => {
    console.log("HEADERS: ", req.headers);

    const token = req.headers.authorization || req.headers.Authorization;


    let request = new Request(`${process.env.AUTH_SERVICE}/user/authentication`);

    request.setHeaders({
        authorization: token
    });

    // TODO: Validation endpoint on user service, return User Info
    // request.post

    // Pass
}