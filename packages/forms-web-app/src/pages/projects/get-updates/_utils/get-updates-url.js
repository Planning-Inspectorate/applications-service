const { getProjectsURL } = require('../../_utils/get-projects-url');
const { getUpdatesRoute } = require('../config');

const getProjectUpdatesURL = (caseRef) => {
	const projectsURL = getProjectsURL(caseRef);
	return `${projectsURL}/${getUpdatesRoute}`;
};

//TODO: remove this once all of the routes are updated to new structure
const getUpdatesRoutes = {
	start: 'start',
	email: 'email',
	howOften: 'how-often',
	confirm: 'confirm-your-email',
	subscribed: 'subscribed',
	unsubscribe: 'unsubscribe-confirm',
	unsubscribed: 'unsubscribed'
};

module.exports = { getUpdatesRoutes, getProjectUpdatesURL };
