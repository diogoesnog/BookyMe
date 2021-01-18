const Slot = require('../models/slot.js');

module.exports.newSlot = (slot) => {
    const newSlot = new Slot(slot);

    return newSlot.save();
};

module.exports.getStoreSlots = (storeId, hideFull) => {
    if (hideFull === "true") {
        return Slot.find({$and: [{storeId: storeId}, {is_full: false}]});
    }
    else
        return Slot.find({storeId: storeId});
};

module.exports.getSlotCapacity = (slotId) => {
    return Slot.findOne({_id: slotId}, {_id: 0, capacity: 1});
};

module.exports.getStoreFromSlotID = (slotId) => {
    return Slot.findOne({_id: slotId}, {_id: 0, storeId: 1});
};

module.exports.getServiceDate = (slotId) => {
    return Slot.findOne({_id: slotId}, {_id: 0, date: 1});
};

module.exports.removeSlot = (slotId) => {
    return Slot.deleteOne({_id: slotId});
};

module.exports.slotIsFull = (slotId) => {
    return Slot.updateOne({_id: slotId}, {is_full: true});
};

module.exports.slotIsNotFull = (slotId) => {
    return Slot.updateOne({_id: slotId}, {is_full: false});
};
