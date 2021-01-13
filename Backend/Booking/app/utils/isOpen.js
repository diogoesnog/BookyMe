module.exports.isOpen = (serviceDate, schedule) => {
    const serviceHour = [serviceDate.getUTCHours(), serviceDate.getUTCMinutes()];
    const closingHour = schedule.closingHour.split(':');
    const openingHour = schedule.openingHour.split(':');

    if (serviceHour[0] > openingHour[0] && serviceHour[0] < closingHour[0])
        return true;
    else if (serviceHour[0] === openingHour[0] && serviceHour[1] > openingHour[1])
        return true;
    else if (serviceHour[0] === closingHour[0] && serviceHour[1] < closingHour[1])
        return true;
    return false;
}
