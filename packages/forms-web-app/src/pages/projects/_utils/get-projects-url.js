const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsRoute, projectsRouteParam } = require('../config');

const getProjectsURL = (caseRef = `:${projectsRouteParam}`) => {
	const originURL = getOriginURL();

	const formattedCaseRef = decodeURIComponent(caseRef).trim();

	return `${originURL}/${projectsRoute}/${formattedCaseRef}`;
};

module.exports = { getProjectsURL };
