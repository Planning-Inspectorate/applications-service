const { getProjectsURL } = require('../../_utils/get-projects-url');
const { projectsIndexRoute } = require('../config');

const getProjectsIndexURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);
	const projectsIndexPath = projectsIndexRoute ? `/${projectsIndexRoute}` : '';

	return `${projectsURL}${projectsIndexPath}`;
};

module.exports = { getProjectsIndexURL };
