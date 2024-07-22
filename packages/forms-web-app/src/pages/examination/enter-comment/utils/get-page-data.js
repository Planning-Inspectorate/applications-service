const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const {
	getSubmissionItemTitleByLocale
} = require('../../_utils/get-content/get-submission-item-title-by-locale');
const {
	routesConfig: {
		examination: {
			pages: { enterComment, evidenceOrComment }
		}
	}
} = require('../../../../routes/config');

const pageData = {
	id: enterComment.id,
	url: enterComment.route,
	sessionId: enterComment.sessionId
};

const getPageData = (i18n, query, session) => {
	if (query === undefined || session === undefined)
		throw new Error('Query or session is undefined');

	const activeSubmissionItem = getActiveSubmissionItem(session);

	return {
		...pageData,
		submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
		backLinkUrl: getSubmissionItemPageUrl(query, evidenceOrComment.route),
		comment: activeSubmissionItem[enterComment.sessionId] || ''
	};
};

module.exports = { getPageData };
