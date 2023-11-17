const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesIndexRoute } = require('../config');

const getUpdatesIndexURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesIndexRoute}`;
};

module.exports = { getUpdatesIndexURL };
