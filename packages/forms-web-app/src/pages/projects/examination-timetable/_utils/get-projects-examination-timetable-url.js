const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectsExaminationTimetableRoute } = require('../config');

const getProjectsExaminationTimetableURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${projectsExaminationTimetableRoute}`;
};

module.exports = { getProjectsExaminationTimetableURL };
