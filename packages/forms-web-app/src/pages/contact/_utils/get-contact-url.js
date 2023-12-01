const { getOriginURL } = require('../../_utils/get-origin-url');
const { contactRoute } = require('../config');

const getContactURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${contactRoute}`;
};

module.exports = { getContactURL };
