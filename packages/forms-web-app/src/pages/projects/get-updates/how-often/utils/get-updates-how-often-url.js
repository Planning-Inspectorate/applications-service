const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesHowOftenRoute } = require('../config');

const getUpdatesHowOftenURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesHowOftenRoute}`;
};

module.exports = { getUpdatesHowOftenURL };
