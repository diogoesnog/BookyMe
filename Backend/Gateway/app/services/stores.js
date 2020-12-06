const Request = require('../utils/Request');


module.exports.getAll = () => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores`);
    request.isJson();
    return request.get();
}

module.exports.insertCatalog = (store, catalog) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}`);
    request.isJson();

    return request.post(catalog);
}

module.exports.create = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores`);
    request.isJson();

    return request.post(store);
}

module.exports.uploadLogo = (store, logo) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}/logo`);

    return request.uploadMedia("logo", logo);
}