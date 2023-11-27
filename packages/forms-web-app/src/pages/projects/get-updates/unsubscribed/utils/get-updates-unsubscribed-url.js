const { getUpdatesURL } = require('../../_utils/get-updates-url');
const { getUpdatesUnsubscribedRoute } = require('../config');

const getUpdatesUnsubscribedURL = (caseRef) => {
	const updatesURL = getUpdatesURL(caseRef);

	return `${updatesURL}/${getUpdatesUnsubscribedRoute}`;
};

module.exports = { getUpdatesUnsubscribedURL };
