const { getActiveSubmissionItem } = require('../../_session/submission-items-session');
const { getContentByLocale } = require('../../../_utils/get-content-by-locale');

const getSubmissionItemTitleByLocale = (i18n, session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);

	return getContentByLocale(
		i18n,
		activeSubmissionItem.submissionItem,
		activeSubmissionItem.submissionItemWelsh
	);
};

module.exports = { getSubmissionItemTitleByLocale };
