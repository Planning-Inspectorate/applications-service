const logger = require('../../../lib/logger');
const { handleProcessSubmissionRetry } = require('./utils/handleProcessSubmissionRetry');

const view = 'error/have-your-say-journey-error';

const getSubmissionError = (req, res) => {
	try {
		const { session } = req;

		handleProcessSubmissionRetry(session);

		return res.render(view);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionError
};
