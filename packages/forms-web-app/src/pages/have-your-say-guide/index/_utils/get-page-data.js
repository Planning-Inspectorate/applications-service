const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (refUrl, session) => ({
	backLinkUrl: getBackLinkURL(refUrl, session)
});

module.exports = { getPageData };
