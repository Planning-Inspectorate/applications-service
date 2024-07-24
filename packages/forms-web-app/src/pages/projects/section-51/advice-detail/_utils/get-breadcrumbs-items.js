const { getSection51IndexURL } = require('../../index/_utils/get-section-51-index-url');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getBreadcrumbsItems = (path, caseRef, id, i18n) =>
	isRegisterOfAdviceDetailURL(path, id)
		? null
		: [
				{
					href: getSection51IndexURL(caseRef),
					text: i18n.t('section51.heading')
				},
				{ text: i18n.t('section51.details.adviceInDetail') }
		  ];

module.exports = { getBreadcrumbsItems };
