module.exports.isOpen = (serviceDate, schedule) => {
    const weekService = serviceDate.toLocaleTimeString('en-us', {weekday: 'long'}).split(' ')[0];

    for (let item of schedule) {
        if (item.day === weekService) {
            const closingHour = item.closingHour.split(':');
            const openingHour = item.openingHour.split(':');
            const serviceHour = [serviceDate.getUTCHours(), serviceDate.getUTCMinutes()];

            if (serviceHour[0] > openingHour[0] && serviceHour[0] < closingHour[0])
                return true;
            else if (serviceHour[0] == openingHour[0] && serviceHour[1] > openingHour[1])
                return true;
            else if (serviceHour[0] == closingHour[0] && serviceHour[1] < closingHour[1])
                return true;
        }
    }
    return false;
}