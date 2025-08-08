const { getOriginURL } = require('../../../../_utils/get-origin-url');
const { shortDocRoute, shortDocParam } = require('../../config');

const getShortDocLinkPath = () => {
	const originURL = getOriginURL();

	return `${originURL}/${shortDocRoute}/:${shortDocParam}`;
};

module.exports = { getShortDocLinkPath };
