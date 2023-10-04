const { projectSearchRoute } = require('../project-search/config');
const { registerOfApplicationsRoute } = require('../register-of-applications/config');

const allProjectsSubNavigationRoutes = {
	projectSearch: `/${projectSearchRoute}`,
	registerOfApplications: `/${registerOfApplicationsRoute}`
};

module.exports = { allProjectsSubNavigationRoutes };
