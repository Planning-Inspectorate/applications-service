const { getHasProjectTimetables } = require('../../../../utils/timetables/get-timetables-state');
const { getProjectsIndexURL } = require('../../index/_utils/get-projects-index-url');

const isProjectInformationPage = (path, caseRef) =>
	path.replace(/\/$/, '') === getProjectsIndexURL(caseRef);

const getShowExaminationLink = async (path, session, caseRef) =>
	await getHasProjectTimetables(session, caseRef, isProjectInformationPage(path, caseRef));

module.exports = { getShowExaminationLink };
