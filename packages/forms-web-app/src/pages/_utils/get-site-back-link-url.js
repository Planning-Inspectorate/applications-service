const {
	server: { host }
} = require('../../config');

const getSiteBackLinkURL = (url) => (url && url.includes(host) ? url : null);

module.exports = { getSiteBackLinkURL };
