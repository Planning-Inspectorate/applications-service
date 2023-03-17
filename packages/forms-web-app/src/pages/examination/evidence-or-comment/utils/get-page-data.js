const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, selectDeadline }
		}
	}
} = require('../../../../routes/config');

const getPageData = (query, session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const pageData = {
		activeSubmissionItemTitle: activeSubmissionItem[selectDeadline.sessionId[2]],
		backLinkUrl: getSubmissionItemPageUrl(query, selectDeadline.route),
		id: evidenceOrComment.id,
		options: [
			evidenceOrComment.options[1],
			evidenceOrComment.options[2],
			evidenceOrComment.options[3]
		],
		pageTitle: evidenceOrComment.title,
		title: evidenceOrComment.title
	};

	if (activeSubmissionItem[evidenceOrComment.sessionId])
		pageData.options = markActiveChecked(pageData.options, activeSubmissionItem.submissionType);

	return pageData;
};

module.exports = { getPageData };
