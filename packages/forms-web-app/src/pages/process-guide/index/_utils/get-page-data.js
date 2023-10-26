const { haveYourSayGuideURL } = require('../../../have-your-say-guide/index/config');
const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (refUrl, session) => ({
	backLinkUrl: getBackLinkURL(refUrl, session),
	haveYourSayGuideURL
});

module.exports = { getPageData };
