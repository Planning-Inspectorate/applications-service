const logger = require('../../../lib/logger');
const { getPageData } = require('./utils/get-page-data');
const { getSummaryListDetails } = require('./utils/get-summary-list-details');
const { getSummaryListSubmissionItems } = require('./utils/get-summary-list-submission-items');
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
		res.render(checkYourAnswers.view, {
			...getPageData(session),
			...getSummaryListDetails(session),
			...getSummaryListSubmissionItems(session)
		});
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getCheckYourAnswers
};
