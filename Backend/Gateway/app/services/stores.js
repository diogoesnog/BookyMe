const Request = require('../utils/Request');


module.exports.getAll = () => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores`);

    return request.get();
}

module.exports.insertCatalog = (store, catalog) => {
    let request = new Request(`${process.env.STORE_SERVICE_ENDPOINT}/stores/${store}`);

    return request.post(catalog);
}