export default class Booking {
  constructor(storeID, date, hour) {
    this.serviceID = storeID;
    console.log(date);
    console.log(hour);
    this.serviceDate = date;
  }

  withObject(user) {
    this.serviceID = user.storeID;
    this.serviceDate = user.date;
  }
}
