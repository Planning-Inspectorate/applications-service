const { getProjectsURL } = require('../../_utils/get-projects-url');
const { getFormattedUpdates } = require('./get-formatted-updates');
const { getUpdatesIndexURL } = require('../../get-updates/index/utils/get-updates-index-url');

const getPageData = ({ caseRef, projectName }, projectUpdates, i18n) => {
	const title = i18n.t('projectUpdates.heading1');
	return {
		contentBackLinkUrl: getProjectsURL(caseRef),
		title: title,
		pageTitle: `${projectName} - ${title}`,
		updates: getFormattedUpdates(projectUpdates, i18n.language),
		getUpdatesUrl: getUpdatesIndexURL(caseRef)
	};
};

module.exports = { getPageData };
