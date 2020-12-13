const Request = require('../utils/Request');

module.exports.login = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/authentication`);

    request.isJson();

    return request.post(user);
}

module.exports.register = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/register`);

    request.isJson();

    return request.post(user);
}


module.exports.updateAccount = (headers, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/account`);

    request.isJson();

    request.setHeaders(headers);

    return request.put(info);
}

module.exports.updatePassword = (headers, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/password`);

    request.isJson();

    request.setHeaders(headers);

    return request.patch(info);
}

module.exports.validateToken = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/validation`);

    request.isJson();

    request.setHeaders({
        authorization: token
    });

    return request.get();
}