const { setTimeToStartOfDay, getDateNow } = require('../../../../../utils/date-utils');

const hasRepresentationsAvailable = (representationsAvailableDate) =>
	representationsAvailableDate === null
		? false
		: new Date(setTimeToStartOfDay(getDateNow())) >= new Date(representationsAvailableDate);

module.exports = { hasRepresentationsAvailable };
