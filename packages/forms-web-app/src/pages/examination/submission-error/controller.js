const logger = require('../../../lib/logger');
const { handleProcessSubmissionRetry } = require('./utils/handleProcessSubmissionRetry');
const {
	routesConfig: {
		examination: {
			baseDirectory,
			pages: { haveYourSay }
		}
	}
} = require('../../../routes/config');
const { getProjectsURL } = require('../../projects/_utils/get-projects-url');

const getSubmissionError = (req, res) => {
	try {
		const { session, params } = req;
		const { case_ref } = params;

		handleProcessSubmissionRetry(session);

		const projectsURL = getProjectsURL(case_ref);
		const indexURL = `${projectsURL}/${baseDirectory}/${haveYourSay.route}`;

		return res.render('error/have-your-say-submission-failed', { indexURL });
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSubmissionError
};
