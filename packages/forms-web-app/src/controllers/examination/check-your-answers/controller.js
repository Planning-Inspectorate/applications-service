const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getSummaryList } = require('./utils/get-summary-list');
const {
	routesConfig: {
		examination: {
			pages: { checkYourAnswers }
		}
	}
} = require('../../../routes/config');
const { setDetailsMode } = require('../../session/deadline-session/utils/get-details-mode');

const getCheckYourAnswers = (req, res) => {
	try {
		const { session } = req;
		return res.render(checkYourAnswers.view, {
			...getPageData(session),
			...getSummaryList(session)
		});
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postCheckYourAnswers = (req, res) => {
	try {
		const { body, session } = req;
		setDetailsMode(session, false);
		return res.redirect(body.fella);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckYourAnswers,
	postCheckYourAnswers
};
