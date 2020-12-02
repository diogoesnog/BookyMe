
const jwt = require('jsonwebtoken');
const Users = require('../controllers/users');
const Response = require('rapid-status');

module.exports = async (req,res,next) => {
    let response;
    try{
        const token = req.headers.authorization || req.headers.Authorization;

        let decodedToken = jwt.verify(token, process.env.AUTH_SECRET, process.env.AUTH_TOKEN_ALGORITHM);

        let user = await Users.findById(decodedToken.user);

        if (!user) {
            response = Response.FORBIDDEN();
            res.status(response.status).jsonp(response);
        }
        else{
            req.decodedUser = {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                address: user.address,
                type: user.type
            }
            next();
        }
    } catch (err) {
            response = Response.TOKEN_EXPIRED(err);
            res.status(response.status).jsonp(response);
    }
}