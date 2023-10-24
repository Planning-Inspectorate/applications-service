const { mapTitles } = require('../../../_utils/map-titles');
const { haveYourSayGuideURL } = require('../../../have-your-say-guide/index/config');
const { processGuideTitle } = require('../config');
const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (refUrl, session) => ({
	...mapTitles(processGuideTitle, processGuideTitle),
	backLinkUrl: getBackLinkURL(refUrl, session),
	haveYourSayGuideURL
});

module.exports = { getPageData };
