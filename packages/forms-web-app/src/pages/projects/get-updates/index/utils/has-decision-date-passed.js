const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');

dayjs.extend(isSameOrAfter);

const hasDecisionDatePassed = (confirmedDateOfDecision) => {
	const dayToday = dayjs();
	const dayOfConfirmedDecision = dayjs(confirmedDateOfDecision);

	return dayToday.isSameOrAfter(dayOfConfirmedDecision, 'day');
};

module.exports = { hasDecisionDatePassed };
