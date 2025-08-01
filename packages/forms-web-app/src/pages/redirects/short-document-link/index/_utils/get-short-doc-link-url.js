const { shortDocRoute, shortDocParam } = require('../../config');

const getShortDocLinkURL = () => {
	return `/${shortDocRoute}/:${shortDocParam}`;
};

module.exports = { getShortDocLinkURL };
