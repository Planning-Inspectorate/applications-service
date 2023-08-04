const { getFormattedUpdates } = require('./get-formatted-updates');

const getPageData = ({ caseRef, projectName }, projectUpdates) => {
	return {
		contentBackLinkUrl: `/projects/${caseRef}`,
		title: 'All project updates',
		pageTitle: `${projectName} - All project updates`,
		updates: getFormattedUpdates(projectUpdates)
	};
};

module.exports = { getPageData };
