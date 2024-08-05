const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			pages: { submissionComplete, submissionError }
		}
	}
} = require('../../../routes/config');
const { handleProcessSubmission } = require('./utils/process');
const { setExaminationUploadingState } = require('../_session/examination-session');
const { deleteExaminationSession } = require('../_session/delete-examination-session');
const { getSubmittingItemsSubtitle } = require('./utils/get-submitting-items-subtitle');

const view = 'examination/process-submission/view.njk';

const getProcessSubmission = (req, res) => {
	const { i18n, session } = req;

	try {
		const pageData = {
			submittingItemsSubtitle: getSubmittingItemsSubtitle(i18n, session)
		};
		return res.render(view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postProcessSubmission = async (req, res) => {
	try {
		// throw new Error('this is an error');

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
