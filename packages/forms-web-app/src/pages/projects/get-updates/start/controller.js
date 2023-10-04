const { setGetUpdatesSession } = require('../_session/get-updates');
const { getUpdatesRoutes } = require('../_utils/get-updates-routes');

const view = 'projects/get-updates/start/view.njk';

const getGetUpdatesStart = (req, res) => {
	const { session } = req;

	setGetUpdatesSession(session);

	return res.render(view, {
		nextPageRoute: getUpdatesRoutes.email,
		pageHeading: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`
	});
};

module.exports = {
	getGetUpdatesStart
};
