const { processGuideSubdirectory } = require('../config');

const getProcessGuidePageURL = (route) => {
	const processGuideRoute = route ? `/${route}` : '';
	return `/${processGuideSubdirectory}${processGuideRoute}`;
};

module.exports = { getProcessGuidePageURL };
