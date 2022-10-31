const {
	getActiveSubmissionItem,
	getSubmissionItemSubmissionType,
	addKeyValueToActiveSubmissionItem
} = require('../session/submission-items-session');

const logger = require('../../../lib/logger');

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: { enterComment, evidenceOrComment }
		}
	}
} = require('../../../routes/config');
const { getRedirectUrl } = require('./utils/get-redirect-url');

const pageData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrComment.route}`,
	id: enterComment.id,
	pageTitle: enterComment.name,
	title: enterComment.name
};

const getEnterComment = async (req, res) => {
	try {
		const { session } = req;
		const setPageData = { ...pageData };

		const activeSubmissionItem = getActiveSubmissionItem(session);
		setPageData.activeSubmissionItemTitle = activeSubmissionItem.submissionItem;
		setPageData.comment = activeSubmissionItem.comment || '';

		return res.render(enterComment.view, setPageData);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEnterComment = async (req, res) => {
	try {
		const { body, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		const activeSubmissionItem = getActiveSubmissionItem(session);

		if (errors[enterComment.id] || Object.keys(errors).length > 0) {
			const setPageData = { ...pageData };

			setPageData.activeSubmissionItemTitle = activeSubmissionItem.submissionItem;
			setPageData.comment = activeSubmissionItem.comment || '';
			return res.render(enterComment.view, {
				...setPageData,
				errors,
				errorSummary
			});
		}

		const submissionType = getSubmissionItemSubmissionType(activeSubmissionItem);

		addKeyValueToActiveSubmissionItem(session, 'comment', body[enterComment.id]);

		const redirectUrl = getRedirectUrl(submissionType);

		return res.redirect(redirectUrl);
	} catch (error) {
		logger.error(`Error: ${error}`);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
