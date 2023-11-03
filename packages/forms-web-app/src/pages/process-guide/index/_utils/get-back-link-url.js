const { processGuideSubdirectory } = require('../../config');

const getBackLinkURL = (url, session) => {
	if (url && !url.includes(processGuideSubdirectory)) session.referrerBackLink = url;
	return session.referrerBackLink;
};

module.exports = { getBackLinkURL };
