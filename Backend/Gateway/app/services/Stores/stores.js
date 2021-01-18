const Request = require('../../utils/Request');


module.exports.getAll = (params) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores`);

    request.setParams(params);
    request.isJson();
    request.acceptJson();

    return request.get();
}

module.exports.insertCatalog = (store, catalog) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}`);
    request.isJson();

    return request.post(catalog);
}

module.exports.create = (token, store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.post(store);
}

module.exports.uploadLogo = (store, logo) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/logo`);

    return request.uploadMedia("logo", logo);
}

module.exports.uploadPicture = (store, picture) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/picture`);

    return request.uploadMedia("picture", picture);
}

module.exports.uploadPhoto = (store, photo) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/photo`);

    request.acceptJson();

    return request.uploadMedia("photo", photo);
}

module.exports.insertSchedule = (store, schedule) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/schedule`);
    request.isJson();

    return request.post(schedule);
}

module.exports.updateDescription = (store, description) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/description`);

    request.isJson();
    request.acceptJson();

    return request.patch(description);
}

module.exports.updateAddress = (store, address) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/address`);

    request.isJson();
    request.acceptJson();

    return request.patch(address);
}

module.exports.updatePhone = (store, phone) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/phone`);
    request.isJson();
    request.acceptJson();
    return request.patch(phone);
}

module.exports.addCoordinates = (store, coordinates) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/coordinates`);
    request.isJson();

    return request.put(coordinates);
}

module.exports.deleteOne = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}`);

    return request.delete();
}

module.exports.deletePhoto = (store, photo) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/photos/${photo}`);

    return request.delete();
}

module.exports.deleteSchedule = (store, schedule) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/schedule/${schedule}`);

    return request.delete();
}


module.exports.getPopular = () => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/popular`);

    request.isJson();

    return request.get();
}

module.exports.getScheduleList = (id) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/scheduleList/${id}`);

    request.isJson();

    return request.get();
}

// TODO: move to user endpoint services
module.exports.userFavorites = (user) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${user}`);

    request.isJson();

    return request.get();
}


module.exports.adminStores = (token) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/admin`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}


module.exports.getCategories = () => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/categories/results`);

    request.isJson();

    return request.get();
}

module.exports.getFavorites = (token) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/favorites`);

    request.isJson();
    request.appendHeader("Authorization", token);
    request.acceptJson();

    return request.get();
}
