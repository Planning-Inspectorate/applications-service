const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');

const getBreadcrumbsItems = (caseRef) => [
	{ href: getSection51IndexURL(caseRef), text: 'Section 51 advice' },
	{ text: 'Advice in detail' }
];

module.exports = { getBreadcrumbsItems };
