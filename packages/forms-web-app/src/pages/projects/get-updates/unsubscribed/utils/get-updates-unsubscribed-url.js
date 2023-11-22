const { getProjectUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesUnsubscribedRoute } = require('../config');

const getUpdatesUnsubscribedURL = (caseRef) => {
	const projectUpdatesURL = getProjectUpdatesURL(caseRef);

	return `${projectUpdatesURL}/${getUpdatesUnsubscribedRoute}`;
};

module.exports = { getUpdatesUnsubscribedURL };
