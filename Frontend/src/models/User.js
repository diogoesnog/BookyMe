export default class User {
  constructor(name, username, email, address, city, zipCode) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.city=city;
    this.zipCode=zipCode;
    this.password = null;
    this._id = null;
  }

  setPassword(password) {
    this.password = password;
  }

  setId(id) {
    this._id = id;
  }
}
