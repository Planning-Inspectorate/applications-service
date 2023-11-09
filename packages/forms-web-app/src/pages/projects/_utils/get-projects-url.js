const { projectsRoute, projectsRouteParam } = require('../config');

const getProjectsURL = (caseRef = `:${projectsRouteParam}`) => `/${projectsRoute}/${caseRef}`;

module.exports = { getProjectsURL };
