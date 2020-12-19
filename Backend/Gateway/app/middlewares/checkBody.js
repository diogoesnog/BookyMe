const Response = require('rapid-status');

/**
 *
 * @param fields: Array of strings of expected body
 * @returns {function(*, *, *): void}
 */
module.exports.validator = (fields) => {

    return (req, res, next) => {
        let response;
        let bodyKeys = Object.keys(req.body);

        let missing = fields.filter( e => !bodyKeys.includes(e));


        if(missing.length === 0) {
            next();

        } else {
            response = Response.BAD_REQUEST(missing, "Bad Request. Missing expected body fields.");
            res.status(response.status).jsonp(response)
        }
    }
}