const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { featureFlag } = require('../../../../../config');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const isRegistrationOpen = (openDate, closedDate, caseRef) => {
	const dayToday = dayjs();
	const registrationOpenDate = dayjs(openDate);
	const registrationClosedDate = dayjs(closedDate);

	return (
		featureFlag.openRegistrationCaseReferences.includes(caseRef) ||
		(dayToday.isSameOrAfter(registrationOpenDate) &&
			(dayToday.isSameOrBefore(registrationClosedDate, 'day') || !closedDate))
	);
};

module.exports = { isRegistrationOpen };
