const { setProjectUpdatesSession } = require('../_session/project-updates');
const { projectUpdatesRoutes } = require('../_utils/project-updates-routes');

const view = 'projects/project-updates/start/view.njk';

const getProjectUpdatesStart = (req, res) => {
	const { session } = req;

	setProjectUpdatesSession(session);

	return res.render(view, {
		nextPageRoute: projectUpdatesRoutes.email,
		pageHeading: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`
	});
};

module.exports = {
	getProjectUpdatesStart
};
