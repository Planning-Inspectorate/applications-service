const { getDateNow, setTimeToEndOfDay } = require('../../../../../../utils/date-utils');
const { getEventDate } = require('../getters');

const isPastEvent = (event) => setTimeToEndOfDay(getEventDate(event)) < getDateNow();

module.exports = { isPastEvent };
