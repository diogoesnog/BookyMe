export default class Booking {
  constructor(date) {
    // Com um ID do Mikado de forma estática para testar.
    this.serviceDate = date;
    this.serviceId = "5ff4e77cf4cffc04869eb9fd";
  }

  withObject(user) {
    this.serviceDate = user.date;
  }
}
