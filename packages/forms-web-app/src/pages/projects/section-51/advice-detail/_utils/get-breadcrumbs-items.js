const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getBreadcrumbsItems = (path, caseRef, id) =>
	isRegisterOfAdviceDetailURL(path, id)
		? null
		: [
				{ href: getSection51IndexURL(caseRef), text: 'Section 51 advice' },
				{ text: 'Advice in detail' }
		  ];

module.exports = { getBreadcrumbsItems };
