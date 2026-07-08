const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectBoundaryRoute } = require('../config');

const getProjectsBoundaryURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);

	return `${projectsURL}/${projectBoundaryRoute}`;
};

module.exports = { getProjectsBoundaryURL };
