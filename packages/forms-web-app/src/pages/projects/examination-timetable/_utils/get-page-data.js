const { getExamination } = require('./examination/get-examination');

const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../routes/config');

const getPageData = (caseRef, projectName, examinationTimetableData, i18n) => {
	return {
		activeProjectLink: examinationTimetable.id,
		caseRef: caseRef,
		examination: getExamination(examinationTimetableData, i18n),
		pageTitle: `${i18n.t('examinationTimetable.heading1')} - ${projectName} - ${i18n.t(
			'global.headerTitle.default'
		)}`,
		title: projectName
	};
};

module.exports = { getPageData };
