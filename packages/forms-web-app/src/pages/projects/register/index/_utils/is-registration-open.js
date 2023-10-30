const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const isRegistrationOpen = (openDate, closedDate) => {
	const dayToday = dayjs();
	const registrationOpenDate = dayjs(openDate);
	const registrationClosedDate = dayjs(closedDate);

	return (
		dayToday.isSameOrAfter(registrationOpenDate) &&
		(dayToday.isSameOrBefore(registrationClosedDate, 'day') || !closedDate)
	);
};

module.exports = { isRegistrationOpen };
