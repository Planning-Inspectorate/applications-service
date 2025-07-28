const logger = require('../../../lib/logger');
const {
	setActiveSubmissionItemSubmitted,
	deleteActiveSubmissionItemId
} = require('../_session/submission-items-session');
const { getPageData } = require('./utils/get-page-data');
const { getBackLinkUrl } = require('./utils/get-back-link-url');
const { getSummaryList } = require('./utils/get-summary-list');
const {
	routesConfig: {
		examination: {
			pages: { addDeadline }
		}
	}
} = require('../../../routes/config');

const view = 'examination/check-submission-item/view.njk';

const getCheckSubmissionItem = (req, res) => {
	try {
		const { i18n, query, session } = req;

		res.render(view, {
			...getPageData(),
			...getBackLinkUrl(query, session),
			...getSummaryList(i18n, session)
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postCheckSubmissionItem = (req, res) => {
	try {
		const { session } = req;
		setActiveSubmissionItemSubmitted(session, true);
		deleteActiveSubmissionItemId(session);
		res.redirect(`${addDeadline.route}`);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckSubmissionItem,
	postCheckSubmissionItem
};
