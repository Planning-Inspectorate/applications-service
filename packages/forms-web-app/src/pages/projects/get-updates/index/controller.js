const { setGetUpdatesSession } = require('../_session/get-updates');
const { getUpdatesEmailURL } = require('../email/utils/get-updates-email-url');

const view = 'projects/get-updates/index/view.njk';

const getGetUpdatesIndexController = (req, res) => {
	const {
		session,
		params: { case_ref: caseRef }
	} = req;

	setGetUpdatesSession(session);

	return res.render(view, {
		nextPageRoute: getUpdatesEmailURL(caseRef),
		pageHeading: 'Get updates about this project',
		pageTitle: `Get updates | ${res.locals.projectName}`
	});
};

module.exports = {
	getGetUpdatesIndexController
};
