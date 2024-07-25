const { getCurrentViewSession } = require('../../../../controllers/session/current-view-session');
const { getBackLinkUrl } = require('./get-back-link-url');
const {
	getSubmissionItemTitleByLocale
} = require('../../_utils/get-content/get-submission-item-title-by-locale');
const { formatPersonalInformationOptions } = require('./format-personal-information-options');

const getPageData = (i18n, session) => {
	const { id } = getCurrentViewSession(session);

	return {
		backLinkUrl: getBackLinkUrl(id),
		id,
		submissionItemTitle: getSubmissionItemTitleByLocale(i18n, session),
		options: formatPersonalInformationOptions(i18n, session)
	};
};

module.exports = {
	getPageData
};
