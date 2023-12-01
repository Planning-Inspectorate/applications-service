const { getOriginURL } = require('../../_utils/get-origin-url');
const { detailedInformationRoute } = require('../config');

const getDetailedInformationURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${detailedInformationRoute}`;
};

module.exports = { getDetailedInformationURL };
