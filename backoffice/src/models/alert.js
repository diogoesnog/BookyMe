export default class Alert {
    constructor(title, message) {
        this.type = "";
        this.title = title;
        this.message = message;
        this.status = false;
    }

    isInfo() {
        this.type = "info";
        this.status = true;
    }

    isSuccess() {
        this.type = "success";
        this.status = true;
    }

    isError() {
        this.type = "error";
        this.status = true
    }

    isWarning() {
        this.type = "warning";
        this.status = true;
    }

    changeStatus() {
        this.status = !status;
    }
}