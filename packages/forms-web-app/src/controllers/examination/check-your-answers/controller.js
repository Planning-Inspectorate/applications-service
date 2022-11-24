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

const getCheckYourAnswers = (req, res) => {
	try {
		const { session } = req;
		res.render(checkYourAnswers.view, { ...getPageData(session), ...getSummaryList(session) });
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckYourAnswers
};
