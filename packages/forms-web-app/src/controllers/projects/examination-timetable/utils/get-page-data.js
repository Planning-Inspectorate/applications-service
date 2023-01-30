const { getProjectCaseRef } = require('../../utils/get-project-case-ref');
const { getEvents } = require('./events/get-events');
const { getExamination } = require('./examination/get-examination');
const { getProjectName } = require('../../utils/get-project-name');

const {
	routesConfig: {
		project: {
			pages: { examinationTimetable }
		}
	}
} = require('../../../../routes/config');

const getPageData = async (appData) => {
	const projectCaseRef = getProjectCaseRef(appData);
	const projectName = getProjectName(appData);
	const events = await getEvents(appData);
	const examination = getExamination(appData);

	return {
		activeProjectLink: examinationTimetable.id,
		caseRef: projectCaseRef,
		events,
		examination,
		pageTitle: `Examination timetable - ${projectName} - National Infrastructure Planning`,
		subtitle: examinationTimetable.name,
		title: projectName
	};
};

module.exports = { getPageData };
