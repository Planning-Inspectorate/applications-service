const { getPageData } = require('./utils/get-page-data');
const {
	routesConfig: {
		examination: {
			pages: { submissionError }
		}
	}
} = require('../../../routes/config');

const logger = require('../../../lib/logger');
const { handleProcessSubmissionRetry } = require('./utils/handleProcessSubmissionRetry');

const getSubmissionError = (req, res) => {
	try {
		const { session, query } = req;
		const pageData = getPageData(session, query);

		handleProcessSubmissionRetry(session);

		return res.render(submissionError.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionError
};
