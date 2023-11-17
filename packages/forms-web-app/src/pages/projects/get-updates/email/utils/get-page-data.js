const { getGetUpdatesEmailSession } = require('../../_session');
const { getUpdatesRoutes } = require('../../_utils/get-updates-url');

const getPageData = (session) => ({
	email: getGetUpdatesEmailSession(session),
	pageTitle: `What is your email address?`,
	backLinkUrl: getUpdatesRoutes.start
});

module.exports = { getPageData };
