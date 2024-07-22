const logger = require('../../../lib/logger');
const { addKeyValueToActiveSubmissionItem } = require('../_session/submission-items-session');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectRoute } = require('./utils/get-redirect-route');
const { getSubmissionItemPageUrl } = require('../_utils/get-submission-item-page-url');

const view = 'examination/enter-comment/view.njk';

const getEnterComment = async (req, res) => {
	try {
		const { i18n, query, session } = req;

		return res.render(view, getPageData(i18n, query, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEnterComment = async (req, res) => {
	try {
		const { body, i18n, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;

		const pageData = getPageData(i18n, query, session);
		const enterCommentValue = body[pageData.id];

		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			return res.render(view, {
				...pageData,
				comment: enterCommentValue,
				errors,
				errorSummary
			});
		}

		if (!enterCommentValue) throw new Error('Enter comment does not have a value');

		addKeyValueToActiveSubmissionItem(session, pageData.sessionId, enterCommentValue);

		const redirectUrl = getSubmissionItemPageUrl(query, getRedirectRoute(session));

		return res.redirect(redirectUrl);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
