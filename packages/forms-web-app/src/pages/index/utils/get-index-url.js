const { getOriginURL } = require('../../_utils/get-origin-url');
const { indexRoute } = require('../config');

const getIndexURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${indexRoute}`;
};

module.exports = { getIndexURL };
