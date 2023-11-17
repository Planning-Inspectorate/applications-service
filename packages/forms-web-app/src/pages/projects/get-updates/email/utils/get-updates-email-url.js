const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesEmailRoute } = require('../config');

const getUpdatesEmailURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesEmailRoute}`;
};

module.exports = { getUpdatesEmailURL };
