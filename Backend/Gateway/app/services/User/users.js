const Request = require('../../utils/Request');

module.exports.login = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/authentication`);

    request.isJson();
    request.acceptJson();
    request.acceptJson();

    return request.post(user);
}

module.exports.register = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/register`);

    request.isJson();
    request.acceptJson();
    request.acceptJson();

    return request.post(user);
}


module.exports.updateAccount = (token, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/account`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.put(info);
}

module.exports.updatePassword = (token, info) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/password`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.patch(info);
}

module.exports.uploadPicture = (token, picture) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/avatar`);

    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.uploadMedia("avatar", picture);
}


module.exports.validateToken = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/validation`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}