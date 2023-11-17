const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getSubscribedRoute } = require('../config');

const getUpdatesSubscribedURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getSubscribedRoute}`;
};

module.exports = { getUpdatesSubscribedURL };
