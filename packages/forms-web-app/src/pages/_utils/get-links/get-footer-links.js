const {
	getAccessibilityStatementURL
} = require('../../accessibility-statement/utils/get-accessibility-statement-url');
const { getContactURL } = require('../../contact/_utils/get-contact-url');
const { getCookiesURL } = require('../../cookies/_utils/get-cookies-url');
const {
	getTermsAndConditionsURL
} = require('../../terms-and-conditions/_utils/get-terms-and-conditions-url');

const getFooterLinks = {
	accessibilityStatementURL: getAccessibilityStatementURL(),
	contactURL: getContactURL(),
	termsAndConditionsURL: getTermsAndConditionsURL(),
	cookiesURL: getCookiesURL()
};

module.exports = { getFooterLinks };
