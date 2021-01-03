const Request = require('../../utils/Request');

module.exports.getSchedule = (storeId, day) => {
    let request = new Request(`${process.env.STORE_SERVICE}/stores/schedule?storeId=${storeId}&day=${day}`);

    request.isJson();

    return request.get();
}
