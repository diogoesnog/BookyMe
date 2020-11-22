// TODO: Build a nodeJS fetch wrapper and replace axios
// const axios = require('axios');
const Request = require('../utils/Request');

module.exports.login = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/authentication`);

    return request.post(user);

}

module.exports.register = (user) => {

    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/user/register`);

    return request.post(user);
}