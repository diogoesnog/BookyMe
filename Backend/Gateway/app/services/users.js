const Request = require('../utils/Request');

module.exports.login = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/authentication`);

    return request.post(user);
}

module.exports.register = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/register`);

    return request.post(user);
}


module.exports.updateAccount = (headers, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/account`);

    request.setHeaders(headers);

    return request.put(info);
}

module.exports.updatePassword = (headers, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/password`);

    request.setHeaders(headers);

    return request.patch(info);
}