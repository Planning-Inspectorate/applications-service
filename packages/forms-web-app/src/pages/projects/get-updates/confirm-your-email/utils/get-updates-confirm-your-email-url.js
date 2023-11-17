const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesConfirmYourEmailRoute } = require('../config');

const getUpdatesConfirmYourEmailURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesConfirmYourEmailRoute}`;
};

module.exports = { getUpdatesConfirmYourEmailURL };
