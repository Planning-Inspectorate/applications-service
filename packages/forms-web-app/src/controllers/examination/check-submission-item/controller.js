const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getBackLinkUrl } = require('./utils/get-back-link-url');
const { getSummaryList } = require('./utils/get-summary-list');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { addDeadline, checkSubmissionItem }
		}
	}
} = require('../../../routes/config');
const {
	setActiveSubmissionItemSubmitted,
	deleteActiveItem
} = require('../session/submission-items-session');

const getCheckSubmissionItem = (req, res) => {
	try {
		const { session } = req;
		res.render(checkSubmissionItem.view, {
			...getPageData(),
			...getBackLinkUrl(session),
			...getSummaryList(session)
		});
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postCheckSubmissionItem = (req, res) => {
	try {
		const { session } = req;
		setActiveSubmissionItemSubmitted(session, true);
		deleteActiveItem(session);
		res.redirect(`${directory}${addDeadline.route}`);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckSubmissionItem,
	postCheckSubmissionItem
};
