const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			directory,
			pages: { processSubmission, submissionComplete, submissionError }
		}
	}
} = require('../../../routes/config');
const { handleProcessSubmission } = require('./utils/process');
const { setExaminationUploadingState } = require('../session/examination-session');
const { deleteExaminationSession } = require('../session/delete-examination-session');

const getProcessSubmission = (req, res) => {
	try {
		const pageData = {
			warningText: 'Do not refresh this page or navigate away until processing is complete.',
			text: 'This may take a few minutes.',
			title: processSubmission.pageTitle
		};
		return res.render(processSubmission.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postProcessSubmission = async (req, res) => {
	try {
		const { session } = req;
		setExaminationUploadingState(session, true);
		await handleProcessSubmission(session);
		deleteExaminationSession(session);
		return res.redirect(`${directory}${submissionComplete.route}`);
	} catch (error) {
		logger.error(error);
		return res.redirect(`${directory}${submissionError.route}`);
	}
};

module.exports = {
	getProcessSubmission,
	postProcessSubmission
};
