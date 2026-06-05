const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectBoundaryDownloadRoute } = require('../config');

const getProjectsBoundaryDownloadURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${projectBoundaryDownloadRoute}`;
};

module.exports = { getProjectsBoundaryDownloadURL };
