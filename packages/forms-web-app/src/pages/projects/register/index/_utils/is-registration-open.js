const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const isRegistrationOpen = (openDate, closedDate) => {
	const dayToday = dayjs();
	const registrationOpenDate = dayjs(openDate);
	const registrationClosedDate = dayjs(closedDate);

	return (
		dayToday.isSameOrAfter(registrationOpenDate) &&
		(dayToday.isBefore(registrationClosedDate) || !closedDate)
	);
};

module.exports = { isRegistrationOpen };
