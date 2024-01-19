const { getContactURL } = require('../../contact/_utils/get-contact-url');

const getFooterLinks = () => {
	return {
		contactURL: getContactURL()
	};
};

module.exports = { getFooterLinks };
