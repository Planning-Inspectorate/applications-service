const { getOriginURL } = require('../../../../_utils/get-origin-url');
const { shortDocRoute, shortDocParam } = require('../../config');

const getShortDocLinkURL = () => {
	const originURL = getOriginURL();

	return `${originURL}/${shortDocRoute}/:${shortDocParam}`;
};

module.exports = { getShortDocLinkURL };
