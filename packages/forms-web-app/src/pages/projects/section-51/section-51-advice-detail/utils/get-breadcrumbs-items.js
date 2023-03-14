const { getBackLinkUrl } = require('./get-back-link-url');

const getBreadcrumbsItems = (caseRef) => [
	{ href: getBackLinkUrl(caseRef), text: 'Section 51 advice' },
	{ text: 'Advice in detail' }
];

module.exports = { getBreadcrumbsItems };
