const Request = require('../../utils/Request');

module.exports.getFavorites = (token) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/favorite`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();


    return request.get();
}

module.exports.addFavorite = (token, favorite) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/favorite/${favorite}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(favorite);
}

module.exports.removeFavorite = (token, favorite) => {
    let request = new Request(`${process.env.USER_SERVICE_ENDPOINT}/favorite/${favorite}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.delete();
}