const { getSiteBackLinkURL } = require('../../_utils/get-site-back-link-url');
const { mapTitles } = require('../../_utils/map-titles');

const getPageData = (refUrl) => ({
	...mapTitles('Accessibility statement for national infrastructure projects'),
	backLinkUrl: getSiteBackLinkURL(refUrl)
});

module.exports = { getPageData };
