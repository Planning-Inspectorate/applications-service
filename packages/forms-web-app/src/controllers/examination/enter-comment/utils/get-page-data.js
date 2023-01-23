const { getActiveSubmissionItem } = require('../../session/submission-items-session');
const { getSubmissionItemPageUrl } = require('../../utils/get-submission-item-page-url');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { enterComment, evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const pageData = {
	id: enterComment.id,
	pageTitle: enterComment.title,
	title: enterComment.title,
	url: directory + enterComment.route,
	view: enterComment.view,
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
