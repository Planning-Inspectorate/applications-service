const { getOriginURL } = require('../../_utils/get-origin-url');
const { cookiesRoute } = require('../config');

const getCookiesURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${cookiesRoute}`;
};

module.exports = { getCookiesURL };
