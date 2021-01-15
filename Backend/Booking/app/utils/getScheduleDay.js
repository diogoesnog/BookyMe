const Store = require('../services/Stores/stores');

module.exports.getScheduleDay = async (serviceDate, storeId) => {
    let weekService = new Date(serviceDate).toLocaleTimeString('pt-pt', {weekday: 'long'}).split(',')[0];
    weekService = weekService.charAt(0).toUpperCase() + weekService.slice(1); // Capitalize the First Letter

   return (await Store.getSchedule(storeId, weekService)).data.data.schedule["0"];
}
