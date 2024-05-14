const { getSiteBackLinkURL } = require('../../_utils/get-site-back-link-url');

const getPageData = (refUrl) => ({
	backLinkUrl: getSiteBackLinkURL(refUrl)
});

module.exports = { getPageData };
