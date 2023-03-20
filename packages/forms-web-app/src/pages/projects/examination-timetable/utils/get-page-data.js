const { getExamination } = require('./examination/get-examination');

const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../routes/config');

const getPageData = (caseRef, projectName, examinationTimetableData) => {
	return {
		activeProjectLink: examinationTimetable.id,
		caseRef: caseRef,
		examination: getExamination(examinationTimetableData),
		pageTitle: `Examination timetable - ${projectName} - National Infrastructure Planning`,
		subtitle: examinationTimetable.name,
		title: projectName
	};
};

module.exports = { getPageData };
