const { getProjectSearchURL } = require('../../../project-search/utils/get-project-search-url');
const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (refUrl, session) => ({
	backLinkUrl: getBackLinkURL(refUrl, session),
	projectSearchURL: getProjectSearchURL()
});

module.exports = { getPageData };
