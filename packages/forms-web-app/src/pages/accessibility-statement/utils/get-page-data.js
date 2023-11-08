const { getSiteBackLinkURL } = require('../../_utils/get-site-back-link-url');
const { mapTitles } = require('../../_utils/map-titles');

const getPageData = (refUrl) => ({
	...mapTitles('Accessibility statement for National Infrastructure Projects'),
	backLinkUrl: getSiteBackLinkURL(refUrl)
});

module.exports = { getPageData };
