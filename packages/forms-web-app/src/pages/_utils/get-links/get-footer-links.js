const { pinsPrivacyNoticeUrl } = require('../../../config');
const {
	getAccessibilityStatementURL
} = require('../../accessibility-statement/utils/get-accessibility-statement-url');
const { getContactURL } = require('../../contact/_utils/get-contact-url');
const { getCookiesURL } = require('../../cookies/_utils/get-cookies-url');
const {
	getTermsAndConditionsURL
} = require('../../terms-and-conditions/_utils/get-terms-and-conditions-url');

const footerLinkModel = (text, href, attrs) => ({
	text,
	href,
	attrs
});

const getFooterLinks = (i18n) => [
	footerLinkModel(i18n.t('global.footer.links.t&c'), getTermsAndConditionsURL(), {
		'data-cy': 'Terms and conditions'
	}),
	footerLinkModel(i18n.t('global.footer.links.accessibility'), getAccessibilityStatementURL(), {
		'data-cy': 'Accessibility'
	}),
	footerLinkModel(i18n.t('global.footer.links.privacy'), pinsPrivacyNoticeUrl, {
		'data-cy': 'Privacy Notice (on GOV.UK)'
	}),
	footerLinkModel(i18n.t('global.footer.links.cookies'), getCookiesURL(), { 'data-cy': 'Cookies' }),
	footerLinkModel(i18n.t('global.footer.links.contact'), getContactURL(), { 'data-cy': 'Contact' })
];

module.exports = { getFooterLinks };
