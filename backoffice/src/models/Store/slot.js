export default class Slot {
    constructor(capacity, year, month, day, hour, minutes) {
        this.capacity = capacity;
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.minutes = minutes;
        this.date = new Date(year, month, day, hour, minutes);
    }

    override() {
        return {
            capacity: this.capacity,
            date: new Date(this.year, this.month, this.day, this.hour, this.minutes)
        }
    }
}