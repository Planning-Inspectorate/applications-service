const {
	getConfirmedStartOfExamination,
	getDateTimeExaminationEnds
} = require('../../../../../utils/is-before-or-after-date');

const getExaminationCloseDate = (data) =>
	getDateTimeExaminationEnds(
		data?.DateTimeExaminationEnds,
		data?.Stage4ExtensiontoExamCloseDate,
		data?.ConfirmedStartOfExamination
	);

const getExaminationStartDate = (data) =>
	getConfirmedStartOfExamination(data?.ConfirmedStartOfExamination);

module.exports = { getExaminationCloseDate, getExaminationStartDate };
