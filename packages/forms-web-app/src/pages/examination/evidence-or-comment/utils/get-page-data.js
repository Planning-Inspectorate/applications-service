const {
	getSubmissionItemTitleByLocale
} = require('../../_utils/get-content/get-submission-item-title-by-locale');
const { getSubmissionItemPageUrl } = require('../../_utils/get-submission-item-page-url');
const { formatEvidenceOrCommentOptions } = require('./format-evidence-or-comment-options');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment, selectDeadline }
		}
	}
} = require('../../../../routes/config');

const getPageData = (i18n, query, session) => ({
	submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
	backLinkUrl: getSubmissionItemPageUrl(query, selectDeadline.route),
	id: evidenceOrComment.id,
	options: formatEvidenceOrCommentOptions(i18n, session)
});

module.exports = { getPageData };
