const { getOriginURL } = require('../../_utils/get-origin-url');
const { projectsRoute, projectsRouteParam } = require('../config');

const getProjectsURL = (caseRef = `:${projectsRouteParam}`) => {
	const originURL = getOriginURL();

	return `${originURL}/${projectsRoute}/${caseRef}`;
};

module.exports = { getProjectsURL };
