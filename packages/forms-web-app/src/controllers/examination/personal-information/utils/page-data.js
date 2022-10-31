const { getActiveSubmissionItem } = require('../../session/submission-items-session');
const { getBackLinkUrl } = require('./get-back-link-url');
const { markActiveChecked } = require('../../utils/mark-active-checked');

const {
	routesConfig: {
		examination: {
			pages: { personalInformation }
		}
	}
} = require('../../../../routes/config');
const { getCurrentViewSession } = require('../../../session/current-view-session');

const getPageData = (session) => {
	const activeSubmissionItem = getActiveSubmissionItem(session);
	const sessionCurrentView = getCurrentViewSession(session);

	const pageData = {
		hintHtml:
			"<span>Check if your files contain information about:</span><ul><li>children</li><li>health</li><li>crime</li></ul><span>This also includes any information relating to an individual's:</span><ul><li>race</li><li>ethnic origin</li><li>politics</li><li>religion</li><li>trade union membership</li><li>genetics</li><li>biometrics</li><li>sex life</li><li>sexual orientation</li></ul>",
		id: sessionCurrentView.id,
		pageTitle: sessionCurrentView.pageTitle,
		title: sessionCurrentView.title,
		options: [personalInformation.options[1], personalInformation.options[2]]
	};

	pageData.backLinkUrl = getBackLinkUrl(sessionCurrentView.id);

	if (activeSubmissionItem.personalInformation) {
		pageData.options = markActiveChecked(
			pageData.options,
			activeSubmissionItem.personalInformation
		);
	}

	return pageData;
};

module.exports = {
	getPageData
};
