const { mapTitles } = require('../../_utils/map-titles');
const { getContactURL } = require('../../contact/_utils/get-contact-url');
const { getCookiesURL } = require('../../cookies/_utils/get-cookies-url');

const getPageData = () => ({
	...mapTitles('Terms and conditions'),
	termsPageUrls: {
		contact: getContactURL(),
		cookies: getCookiesURL()
	}
});

module.exports = { getPageData };
