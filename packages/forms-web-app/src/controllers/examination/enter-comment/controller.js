const logger = require('../../../lib/logger');
const { addKeyValueToActiveSubmissionItem } = require('../session/submission-items-session');
const { getPageData } = require('./utils/get-page-data');
const { getRedirectRoute } = require('./utils/get-redirect-route');
const { getSubmissionItemPageUrl } = require('../utils/get-submission-item-page-url');
const { sanitiseFormPostResponse } = require('../../../utils/sanitise-form-post.js');

const getEnterComment = async (req, res) => {
	try {
		const { query, session } = req;
		const pageData = getPageData(query, session);
		return res.render(pageData.view, pageData);
	} catch (error) {
		logger.error(error);
		return res.status(500).render('error/unhandled-exception');
	}
};

const postEnterComment = async (req, res) => {
	try {
		const { body, query, session } = req;
		const { errors = {}, errorSummary = [], origin } = body;
		const originIsSanitiseFormPost = origin === 'sanitise-form-post';
		const pageData = getPageData(query, session);
		if (errors[pageData.id] || Object.keys(errors).length > 0) {
			if (originIsSanitiseFormPost) {
				return res.send(new sanitiseFormPostResponse(true, pageData.url));
			}

			return res.render(pageData.view, {
				...pageData,
				errors,
				errorSummary
			});
		}

		const enterCommentValue = body[pageData.id];
		if (!enterCommentValue) throw new Error('Enter comment does not have a value');

		addKeyValueToActiveSubmissionItem(session, pageData.sessionId, enterCommentValue);

		const redirectUrl = getSubmissionItemPageUrl(query, getRedirectRoute(session));

		if (originIsSanitiseFormPost) {
			return res.send(new sanitiseFormPostResponse(false, redirectUrl));
		}

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
