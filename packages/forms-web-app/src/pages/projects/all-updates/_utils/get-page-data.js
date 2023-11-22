const { getProjectsURL } = require('../../_utils/get-projects-url');
const { getFormattedUpdates } = require('./get-formatted-updates');

const getPageData = ({ caseRef, projectName }, projectUpdates) => {
	return {
		contentBackLinkUrl: getProjectsURL(caseRef),
		title: 'All project updates',
		pageTitle: `${projectName} - All project updates`,
		updates: getFormattedUpdates(projectUpdates)
	};
};

module.exports = { getPageData };
