const { getContactURL } = require('../../contact/_utils/get-contact-url');

const getFooterLinks = {
	contactURL: getContactURL()
};

module.exports = { getFooterLinks };
