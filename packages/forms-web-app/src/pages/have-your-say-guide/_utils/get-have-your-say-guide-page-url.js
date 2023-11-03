const { haveYourSayGuideSubdirectory } = require('../config');

const getHaveYourSayGuidePageURL = (route) => {
	const haveYourSayGuideRoute = route ? `/${route}` : '';
	return `/${haveYourSayGuideSubdirectory}${haveYourSayGuideRoute}`;
};

module.exports = { getHaveYourSayGuidePageURL };
