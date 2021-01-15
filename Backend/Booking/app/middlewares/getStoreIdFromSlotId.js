const Response = require('rapid-status');
const Slot = require('../controllers/slot');

module.exports = async (req, res, next) => {
    try {
        req.storeId = (await Slot.getStoreFromSlotID(req.params.id)).storeId;
        next();
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err, "Can't find storeID for that slot. Does the slot exist?");
        res.status(response.status).jsonp(response);
    }
}
