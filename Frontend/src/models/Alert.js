export default class Alert {
  constructor(title, message) {
    this.title = title;
    this.message = message;
    this.show = false;
    this.isError = false; // if is error, show error pane, otherwise informative
  }

  setShow(toggle) {
    this.show = toggle;
  }

  isError(value) {
    this.isError = value
  }


}
