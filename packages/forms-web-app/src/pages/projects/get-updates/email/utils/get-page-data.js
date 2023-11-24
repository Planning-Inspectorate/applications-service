const { getGetUpdatesEmailSession } = require('../../_session');
const { getUpdatesIndexURL } = require('../../index/utils/get-updates-index-url');

const getPageData = (session, caseRef) => ({
	email: getGetUpdatesEmailSession(session),
	pageTitle: `What is your email address?`,
	backLinkUrl: getUpdatesIndexURL(caseRef)
});

module.exports = { getPageData };
