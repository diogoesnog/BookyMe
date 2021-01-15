const Response = require('rapid-status');
const Booking = require('../controllers/booking');

module.exports = async (req, res, next) => {
    try {
        req.storeId = (await Booking.getStoreFromID(req.params.id)).storeId;
        next();
    } catch (err) {
        const response = Response.INTERNAL_ERROR(err, "Can't find storeID for that reservation. Does the reservation exist?");
        res.status(response.status).jsonp(response);
    }
}
