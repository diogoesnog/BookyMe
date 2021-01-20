export default class Booking {
  constructor(slotId, serviceId) {
    this.slotId = slotId;
    this.serviceId = serviceId;
  }

  withObject(booking) {
    this.slotId = booking.slotId;
    this.serviceId = booking.serviceId;
  }
}
