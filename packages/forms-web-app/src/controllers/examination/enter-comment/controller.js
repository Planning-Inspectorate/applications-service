const logger = require('../../../lib/logger');
const { addKeyValueToActiveSubmissionItem } = require('../session/submission-items-session');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectRoute } = require('./utils/get-redirect-route');
const { getSubmissionItemPageUrl } = require('../utils/get-submission-item-page-url');
const {
	routesConfig: {
		examination: {
			pages: { enterComment }
		}
	}
} = require('../../../routes/config');

const getEnterComment = async (req, res) => {
	try {
		const { query, session } = req;
		return res.render(enterComment.view, getPageData(query, session));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEnterComment = async (req, res) => {
	try {
		const { body, query, session } = req;
		const { errors = {}, errorSummary = [] } = body;
		if (errors[enterComment.id] || Object.keys(errors).length > 0) {
			return res.render(enterComment.view, {
				...getPageData(query, session),
				errors,
				errorSummary
			});
		}

		const enterCommentValue = body[enterComment.id];
		if (!enterCommentValue) throw new Error('Enter comment does not have a value');

		addKeyValueToActiveSubmissionItem(session, enterComment.sessionId, enterCommentValue);

		return res.redirect(getSubmissionItemPageUrl(query, getRedirectRoute(session)));
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getEnterComment,
	postEnterComment
};
