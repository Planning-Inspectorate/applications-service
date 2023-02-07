const {
	getExaminationCloseDate,
	getExaminationStartDate
} = require('./getters/get-examination-dates');

const formatExaminationToViewModel = (appData) => {
	return {
		closeDate: getExaminationCloseDate(appData),
		startDate: getExaminationStartDate(appData)
	};
};

module.exports = { formatExaminationToViewModel };
