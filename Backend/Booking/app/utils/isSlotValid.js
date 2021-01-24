const Booking = require('../controllers/booking');
const Slot = require('../controllers/slot');

module.exports.isSlotFree = async (slotId) => {
    try {
        let currentCapacity = (await Booking.getSlotCurrentCapacity(slotId)).shift();
        const MaxCapacity = (await Slot.getSlotCapacity(slotId)).max_capacity;

        if (!currentCapacity) currentCapacity = 0;
        else currentCapacity = currentCapacity.currentCapacity;

        if (currentCapacity+1 === MaxCapacity)
            return 2;
        else if (currentCapacity >= MaxCapacity)
            return 1;
        else
            return 0;
    } catch {
        return -1;
    }
}

module.exports.belongToStore = async (slotId, storeId) => {
    try {
        if ((await Slot.getStoreFromSlotID(slotId)).storeId !== storeId) {
            return -1;
        }
        else return 0;
    } catch {
        return -2;
    }
}

module.exports.isSlotValid = async (slotId, storeId) => {
    // Check if slot belongs to the store
    switch (await this.belongToStore(slotId, storeId)) {
        case -1:    // StoreId doesn't match
            return -1;
        case -2:    // Couldn't find storeId
            return -2;
        case 0:     // StoreId matches
    }

    // Check if slot is free
    switch (await this.isSlotFree(slotId)) {
        case -1:    // Error getting capacity
            return -3;
        case 0:     // Is not full
            return 0;
        case 1:     // Is full
            return 1;
        case 2:     // Will be full
            return 2;
    }
}
