const { mapTitles } = require('../../_utils/map-titles');
const { processGuideTitle } = require('../config');
const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (refUrl, session) => ({
	...mapTitles(processGuideTitle, processGuideTitle),
	backLinkUrl: getBackLinkURL(refUrl, session)
});

module.exports = { getPageData };
