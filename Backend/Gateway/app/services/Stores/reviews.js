const Request = require('../../utils/Request');

module.exports.getRatings = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/reviews/${store}/ratings`);

    request.isJson();
    request.acceptJson();

    return request.get();
}


module.exports.getReviews = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/reviews/store/${store}`);

    request.isJson();

    return request.get();
}

module.exports.addReview = (token, store, body) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/reviews/${store}`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(body);
}

module.exports.deleteAllReview = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/reviews/store/${store}`);

    request.isJson();

    return request.delete();
}

module.exports.deleteReview = (review) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/reviews/${review}`);

    request.isJson();

    return request.delete();
}