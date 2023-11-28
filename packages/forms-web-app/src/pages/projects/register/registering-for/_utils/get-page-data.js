const { getBackLinkURL } = require('./get-back-link-url');

const getPageData = (referrer, caseRef, query, selectedType) => ({
	backLinkUrl: getBackLinkURL(referrer, caseRef, query),
	type: selectedType
});

module.exports = { getPageData };
