const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			pages: { processSubmission, submissionComplete, submissionError }
		}
	}
} = require('../../../routes/config');
const { handleProcessSubmission } = require('./utils/process');
const { setExaminationUploadingState } = require('../_session/examination-session');
const { deleteExaminationSession } = require('../_session/delete-examination-session');
const { getSubmittingItemsSubtitle } = require('./utils/get-submitting-items-subtitle');

const view = 'examination/process-submission/view.njk';

const getProcessSubmission = (req, res) => {
	const { session } = req;

	try {
		const pageData = {
			submittingItemsTitle: 'Processing submission',
			submittingItemsSubtitle: getSubmittingItemsSubtitle(session),
			text: 'This may take a few minutes.',
			title: processSubmission.pageTitle,
			pageTitle: processSubmission.pageTitle,
			warningTextJSEnabled: 'This may take several minutes. Do not refresh this page.',
			warningTextNoScript: 'Do not refresh this page or navigate away until processing is complete.'
		};
		return res.render(view, pageData);
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
		return res.redirect(`${submissionComplete.route}`);
	} catch (error) {
		logger.error(error);
		return res.redirect(`${submissionError.route}`);
	}
};

module.exports = {
	getProcessSubmission,
	postProcessSubmission
};
