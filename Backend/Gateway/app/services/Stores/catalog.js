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

module.exports.deleteCatalog = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/catalogs/store/${store}`);

    request.isJson();

    return request.delete();
}

// Delete Single Item
// TODO: expose with endpoint
module.exports.deleteCatalogItem = (item) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/catalogs/${item}`);

    request.isJson();

    return request.delete();
}
