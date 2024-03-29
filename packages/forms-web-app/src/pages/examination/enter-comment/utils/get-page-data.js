const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const pageData = {
	id: enterComment.id,
	pageTitle: enterComment.title,
	title: enterComment.title,
	url: enterComment.route,
	view: 'examination/enter-comment/view.njk',
	sessionId: enterComment.sessionId
};

const getPageData = (query, session) => {
	if (query === undefined || session === undefined)
		throw new Error('Query or session is undefined');

	const activeSubmissionItem = getActiveSubmissionItem(session);
	return {
		...pageData,
		activeSubmissionItemTitle: activeSubmissionItem.submissionItem,
		backLinkUrl: getSubmissionItemPageUrl(query, evidenceOrComment.route),
		comment: activeSubmissionItem[enterComment.sessionId] || ''
	};
};

module.exports = { getPageData };
