const {
	getExaminationCloseDate,
	getExaminationStartDate
} = require('./getters/get-examination-dates');

const formatExaminationToViewModel = (appData, i18n) => {
	return {
		closeDate: getExaminationCloseDate(appData, i18n),
		startDate: getExaminationStartDate(appData, i18n)
	};
};

module.exports = { formatExaminationToViewModel };
