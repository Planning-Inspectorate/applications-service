const {
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds
} = require('../../../../../../utils/is-before-or-after-date');

const getExaminationCloseDate = (data, i18n) =>
	getDateTimeExaminationEnds(
		data?.DateTimeExaminationEnds,
		data?.Stage4ExtensiontoExamCloseDate,
		data?.ConfirmedStartOfExamination,
		i18n
	);

const getExaminationStartDate = (data, i18n) =>
	getConfirmedStartOfExamination(data?.ConfirmedStartOfExamination, i18n);

module.exports = { getExaminationCloseDate, getExaminationStartDate };
