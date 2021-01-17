export default class Alert {
    constructor(title, message, status) {
        this.type = "";
        this.title = title;
        this.message = message;
        this.status = status;
    }

    isInfo() {
        this.type = "info";
    }

    isSuccess() {
        this.type = "success";
    }

    isError() {
        this.type = "error";
    }

    isWarning() {
        this.type = "warning";
    }

    changeStatus() {
        this.status = !status;
    }
}