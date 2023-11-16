const dayjs = require('dayjs');

const getExaminationOrDecisionCompletedDate = (endDate, extensionDate) => {
	let result = null;

	if (endDate && extensionDate) {
		result = extensionDate;
	}

	if (endDate && !extensionDate) {
		result = dayjs(endDate).add(3, 'month').format('YYYY-MM-DD');
	}

	return result;
};

module.exports = {
	getExaminationOrDecisionCompletedDate
};
