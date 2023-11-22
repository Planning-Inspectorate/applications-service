const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectsDocumentsRoute } = require('../config');

const getProjectsDocumentsURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${projectsDocumentsRoute}`;
};

module.exports = { getProjectsDocumentsURL };
