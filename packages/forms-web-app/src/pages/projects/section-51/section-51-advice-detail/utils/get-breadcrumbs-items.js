const { getSection51Url } = require('./get-navigation-urls');

const getBreadcrumbsItems = (caseRef) => [
	{ href: getSection51Url(caseRef), text: 'Section 51 advice' },
	{ text: 'Advice in detail' }
];

module.exports = { getBreadcrumbsItems };
