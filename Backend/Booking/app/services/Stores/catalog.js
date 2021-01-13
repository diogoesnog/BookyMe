const Request = require('../../utils/Request');

module.exports.getByStore = (store) => {
    let request = new Request(`${process.env.STORE_SERVICE}/catalogs/store/${store}`);

    request.isJson();

    return request.get();
}
