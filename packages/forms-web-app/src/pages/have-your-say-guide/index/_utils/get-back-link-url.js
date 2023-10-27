const { haveYourSayGuideSubdirectory } = require('../../config');

const getBackLinkURL = (url, session) => {
	if (url && !url.includes(haveYourSayGuideSubdirectory)) session.referrerBackLink = url;
	return session.referrerBackLink;
};

module.exports = { getBackLinkURL };
