export default class User {
  constructor(name, username, email, address) {
    this.name = name;
    this.username = username;
    this.address = address;
    this.email = email;
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
