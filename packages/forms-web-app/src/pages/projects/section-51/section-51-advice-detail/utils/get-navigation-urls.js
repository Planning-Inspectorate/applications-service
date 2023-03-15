const getSection51Url = (caseRef) => `/projects/${caseRef}/s51advice`;

const getBackLinkUrl = (referer, caseRef) =>
	referer && referer.includes('s51advice') ? referer : getSection51Url(caseRef);

module.exports = { getSection51Url, getBackLinkUrl };
