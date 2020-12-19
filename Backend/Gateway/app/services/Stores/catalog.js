const Request = require('../../utils/Request');


module.exports.getByStore = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/catalogs/store/${store}`);

    request.isJson();

    return request.get();

}

module.exports.addCatalog = (store, body) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/catalogs/${store}`);

    request.isJson();

    return request.post(body);

}

// TODO: Too confusing, ask for further explanations
module.exports.deleteCatalog = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/catalogs/store/${store}`);

    request.isJson();

    return request.delete();
}

