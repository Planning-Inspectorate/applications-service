const { getProjectUpdatesEmailSession } = require('../../_session');
const { projectUpdatesRoutes } = require('../../_utils/project-updates-routes');

const getPageData = (session) => ({
	email: getProjectUpdatesEmailSession(session),
	pageTitle: `What is your email address?`,
	privacyNoticeUrl:
		'https://www.gov.uk/government/publications/planning-inspectorate-privacy-notices/customer-privacy-notice',
	backLinkUrl: projectUpdatesRoutes.start
});

module.exports = { getPageData };
