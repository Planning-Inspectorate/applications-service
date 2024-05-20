const { getContactURL } = require('../../contact/_utils/get-contact-url');
const { getCookiesURL } = require('../../cookies/_utils/get-cookies-url');

const getPageData = () => ({
	termsPageUrls: {
		contact: getContactURL(),
		cookies: getCookiesURL()
	}
});

module.exports = { getPageData };
