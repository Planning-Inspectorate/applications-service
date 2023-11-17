const { setGetUpdatesSession } = require('../_session/get-updates');
const { getUpdatesRoutes } = require('../_utils/get-updates-url');

const view = 'projects/get-updates/index/view.njk';

const getGetUpdatesIndex = (req, res) => {
	const { session } = req;

	setGetUpdatesSession(session);

	return res.render(view, {
		nextPageRoute: getUpdatesRoutes.email,
		pageHeading: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`
	});
};

module.exports = {
	getGetUpdatesIndex
};
