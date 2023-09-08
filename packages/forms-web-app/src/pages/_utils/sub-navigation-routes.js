const { projectSearchRoute } = require('../project-search/router');
const { registerOfApplicationsRoute } = require('../register-of-applications/router');

const allProjectsSubNavigationRoutes = {
	projectSearch: `/${projectSearchRoute}`,
	registerOfApplications: `/${registerOfApplicationsRoute}`
};

module.exports = { allProjectsSubNavigationRoutes };
